import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
    const [memberGroups, setMemberGroups] = React.useState([]);
    const [inviteGroups, setInviteGroups] = React.useState([]);
    const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
    const [createDialogTitle, setCreateDialogTitle] = React.useState("");
    const [createDialogSuggestions, setCreateDialogSuggestions] = React.useState([]);
    const [createDialogInvites, setCreateDialogInvites] = React.useState([]);

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

    function create(title, invited) {
        GroupService.create(title, invited.map(i => (i.username)))
            .catch(e => console.error(e));
        loadGroups();
    }

    function createDialogSearch(search) {
        if (search === "") { setCreateDialogSuggestions([]); return; }
        UserService.searchUser(search)
            .then((s) => {
                setCreateDialogSuggestions(s);
            }).catch((e) => {
                console.error(e);
            });
    }
    function createDialogAddInvite(user) {
        if (user == null) { return; }
        setCreateDialogInvites([user].concat(createDialogInvites));
    }
    function createDialogRemoveInvite(username) {
        var newinvites = [];
        createDialogInvites.forEach(invite => { 
            if (invite.username !== username) {
                newinvites.push(invite);
            }
        })
        setCreateDialogInvites(newinvites);
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
                <Button variant="contained" color="primary" onClick={() => setCreateDialogOpen(true)}> Create new Group </Button>
            </Grid>
            <Grid item md={7} xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h3"> Open Invitations </Typography>
                        <List> { inviteGroups.map((group) => (
                            <ListItem button onClick={() => props.history.push('/groups/' + group.title)}>
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
                            <ListItem button onClick={() => props.history.push('/groups/' + group.title)}>
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
            <Dialog fullWidth open={createDialogOpen} onClose={() => setCreateDialogOpen(false)}>
                <DialogTitle onClose={() => setCreateDialogOpen(false)}> Create Group </DialogTitle>
                <DialogContent dividers>
                    <TextField required fullWidth autoFocus label="Title" onChange={(e) => setCreateDialogTitle(e.target.value)}/>
                    <Autocomplete
                        freeSolo 
                        options={createDialogSuggestions}
                        getOptionLabel={user => (user.firstName + ' ' + user.lastName)}
                        onChange={(event, value) => { createDialogAddInvite(value); }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                onChange={(e) => createDialogSearch(e.target.value)}
                                label="Invite"
                                placeholder="search"
                                InputProps={{ ...params.InputProps, type: 'search' }}
                            />
                        )}
                    />
                    <List>
                        { createDialogInvites.map((user)  => (
                            <ListItem>
                                <ListItemAvatar>
                                    { /* TODO profile pic goes here */ }
                                </ListItemAvatar>
                                <ListItemText
                                    primary = {user.firstName + " " + user.lastName}
                                    secondary = {user.username}
                                />
                                <ListItemSecondaryAction>
                                    <Button onClick={() => createDialogRemoveInvite(user.username)}> Remove </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => create(createDialogTitle, createDialogInvites)}> Create </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default Groups;
