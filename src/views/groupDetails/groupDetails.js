import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { UserService } from '../../service';
import { GroupService } from '../../service';
import { DialogActions } from '@material-ui/core';

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

    useEffect(() => { loadMembers(); }, []);

    function loadMembers() {
        GroupService.get(props.match.params.title)
            .then(group => {
                setTitle(group.title);
                setMembers(group.members);
                setInvited(group.invited);
            }).catch(e => console.error(e));
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
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick=""> Create new Group </Button>
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
                                <ListItemSecondaryAction>
                                    <Button> Join </Button>
                                </ListItemSecondaryAction>
                            </ListItem> ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item md={7} xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h3"> Invited </Typography>
                        <List> { invited.map((user) => (
                            <ListItem>
                                <ListItemAvatar>
                                    { /* TODO Group pictues */ }
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={ user.firstName + ' ' + user.lastName }
                                    secondary={user.username} />
                                <ListItemSecondaryAction>
                                    <Button > Leave </Button>
                                </ListItemSecondaryAction>
                            </ListItem> ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Groups;
