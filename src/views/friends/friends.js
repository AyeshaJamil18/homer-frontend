import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import SearchField from "react-search-field";
import TextField from '@material-ui/core/TextField';
import { UserService } from '../../service';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        flexGrow: 1,
    }
}));

const Friends = props => {
    const classes = useStyles();
    const [username, setUsername] = React.useState("");
    const [friends, setFriends] = React.useState([]);
    const [addFriendSuggestions, setAddFriendSuggestions] = React.useState([]);

    useEffect(() => { loadFriends(); loadUsername(); }, []);

    function loadFriends() {
        UserService.friends()
            .then(friends => {
                setFriends(friends);
            }).catch(e => console.error(e));
    }

    function loadUsername() {
        UserService.getCurrentUserData()
            .then(user => {
                setUsername(user.username);
            }).catch(e => console.error(e));
    }

    function remove(e) {
        UserService.removeFriend(e)
            .then(() => { loadFriends(); })
            .catch(e => console.error(e))
    }

    function addFriendSearch(e) {
        if (e == "") { setAddFriendSuggestions([]); return; }
        UserService.searchUser(e, {nofriendof: username})
            .then((s) => {
                setAddFriendSuggestions(s);
            }).catch((e) => {
                console.error(e);
            });
    }

    function addFriend(e) {
        UserService.addFriend(e)
            .then(() => { loadFriends(); })
            .catch(e => console.error(e))
    }
    return (
        <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" onClick={() => props.history.push('/profile')}> Profile </Link>
                    <Typography color="text-primary"> Friends </Typography>
                </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                        freeSolo 
                        options={addFriendSuggestions}
                        getOptionLabel={user => (user.firstName + ' ' + user.lastName)}
                        onChange={(event, value) => { addFriend(value.username); }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                onChange={(e) => addFriendSearch(e.target.value)}
                                label="Invite"
                                placeholder="search"
                                InputProps={{ ...params.InputProps, type: 'search' }}
                            />
                        )}
                    />
            </Grid>
            <Grid item md={7} xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h3"> Your Friends </Typography>
                        <List> { friends.map((friend) => (
                            <ListItem>
                                <ListItemAvatar>
                                    { /* TODO Profile pictues */ }
                                </ListItemAvatar>
                                <ListItemText
                                    primary={ friend.firstName + ' ' + friend.lastName }
                                    secondary={friend.username} />
                                <ListItemSecondaryAction>
                                    <Button onClick={() => remove(friend.username) } > Remove </Button>
                                </ListItemSecondaryAction>
                            </ListItem> ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Friends;
