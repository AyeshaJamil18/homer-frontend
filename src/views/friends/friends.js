import React from 'react';
import { makeStyles } from '@material-ui/styles';
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
import { UserService } from '../../service';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        flexGrow: 1,
    }
}));

const Friends = () => {
    const classes = useStyles();
    const [suggestions, setSuggestions] = React.useState([]);

    function on_Change(e) {
        if (e == "") { setSuggestions([]); return; }

        UserService.searchUser(e)
            .then((s) => {
                setSuggestions(s);
            }).catch((e) => {
                console.error(e);
            });
    }

    function addFriend(e) {
        UserService.addFriend(e)
            .catch(e => console.error(e))
    }
    return (
        <div className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/profile"> Profile </Link>
                <Typography color="text-primary"> Friends </Typography>
            </Breadcrumbs>
            <Grid
                item
                md={7}
                xs={12}
            >
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title}  variant="h5" color="textSecondary" gutterBottom>
                        Search Friend
                        <SearchField
                            placeholder="Search..."
                            searchText=""
                            classNames="test-class"
                            onChange={(e) => on_Change(e)}
                        />
                    </Typography>


                </CardContent>
                <List>
                    { suggestions.map((user)  => (
                        <ListItem>
                            <ListItemAvatar>
                                { /* TODO profile pic goes here */ }
                            </ListItemAvatar>
                            <ListItemText
                                primary = {user.firstName + " " + user.lastName}
                                secondary = {user.username}
                            />
                            <ListItemSecondaryAction>
                                <Button onClick={() => addFriend(user.username) } > Add </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
                </List>
            </Card>
            </Grid>
        </div>
    );
};

export default Friends;
