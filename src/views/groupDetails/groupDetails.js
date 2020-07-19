import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { UserService } from '../../service';
import { GroupService } from '../../service';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        flexGrow: 1,
    }
}));

const Groups = props => {
    const classes = useStyles();
    const [title, setTitle] = React.useState("");
    const [members, setMembers] = React.useState([]);
    const [invited, setInvited] = React.useState([]);
    const [inviteSuggestions, setInviteSuggestions] = React.useState([]);

    useEffect(() => { loadMembers(); }, []);

    function loadMembers() {
        GroupService.get(props.match.params.title)
            .then(group => {
                setTitle(group.title);
                setMembers(group.members);
                setInvited(group.invited);
            }).catch(e => console.error(e));
    }

    function inviteSearch(search) {
        if (search == "") { setInviteSuggestions([]); return; }
        UserService.searchUser(search, {nomemberof: title})
            .then((s) => {
                setInviteSuggestions(s);
            }).catch((e) => {
                console.error(e);
            });
    }

    function invite(user) {
        if (user == null) { return; }
        GroupService.invite(title, user.username)
            .then(() => loadMembers())
            .catch(e => console.error(e));
    }
    
    return (
        <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" onClick={() => props.history.push('/profile')}> Profile </Link>
                    <Link color="inherit" onClick={() => props.history.push('/groups')}> Groups </Link>
                    <Typography color="text-primary"> {title} </Typography>
                </Breadcrumbs>
            </Grid>
            <Grid item md={7} xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h3"> Invited </Typography>
                        <Autocomplete
                            freeSolo 
                            options={inviteSuggestions}
                            getOptionLabel={user => (user.firstName + ' ' + user.lastName)}
                            onChange={(event, value) => { invite(value); }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    onChange={(e) => inviteSearch(e.target.value)}
                                    label="Invite"
                                    placeholder="search"
                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                />
                            )}
                        />
                        <List> { invited.map((user) => (
                            <ListItem>
                                <ListItemAvatar>
                                    { /* TODO Group pictues */ }
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={ user.firstName + ' ' + user.lastName }
                                    secondary={user.username} />
                            </ListItem> ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item md={7} xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h3"> Members </Typography>
                        <List> { members.map((user) => (
                            <ListItem>
                                <ListItemAvatar>
                                    { /* TODO Group pictues */ }
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={ user.firstName + ' ' + user.lastName }
                                    secondary={user.username} />
                            </ListItem> ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Groups;
