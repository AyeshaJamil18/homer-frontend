import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
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
    const [memberGroups, setMemberGroups] = React.useState([]);
    const [inviteGroups, setInviteGroups] = React.useState([]);

    useEffect(() => { loadGroups(); }, []);

    function loadGroups() {
        UserService.groups()
            .then(groups => { 
                setMemberGroups(groups.member);
                setInviteGroups(groups.invited);
            }).catch(e => console.error(e));
    }

    function join(e) {
        GroupService.join(e)
            .catch(e => console.error(e));
        loadGroups();
    }

    function leave(e) {
        GroupService.leave(e)
            .catch(e => console.error(e));
        loadGroups();
    }
    
    return (
        <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" onClick={() => props.history.push('/profile')}> Profile </Link>
                    <Typography color="text-primary"> Groups </Typography>
                </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary"> Create new Group </Button>
            </Grid>
            <Grid item md={7} xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h3"> Open Invitations </Typography>
                        <List> { inviteGroups.map((group) => (
                            <ListItem>
                                <ListItemAvatar>
                                    { /* TODO Group pictues */ }
                                </ListItemAvatar>
                                <ListItemText primary={ group.title } />
                                <ListItemSecondaryAction>
                                    <Button onClick={() => join(group.title) } > Join </Button>
                                </ListItemSecondaryAction>
                            </ListItem> ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item md={7} xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h3"> Your Groups </Typography>
                        <List> { memberGroups.map((group) => (
                            <ListItem>
                                <ListItemAvatar>
                                    { /* TODO Group pictues */ }
                                </ListItemAvatar>
                                <ListItemText primary={ group.title } />
                                <ListItemSecondaryAction>
                                    <Button onClick={() => leave(group.title) } > Leave </Button>
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
