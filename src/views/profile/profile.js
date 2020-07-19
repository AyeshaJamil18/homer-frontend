import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//import { useAlert, withAlert } from 'react-alert';
import {
    Breadcrumbs,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import { UserService } from '../../service';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        flexGrow: 1,
    }
}));

const Profile = props => {
  //  const alert =useAlert();
    const classes = useStyles();
    const [countFriends, setCountFriends] = React.useState(0);
    const [countGroups, setCountGroups] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [selectedPlaylistName, setSelectedPlaylistName] = React.useState('');

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const SavePlaylist = () => {
        console.log(selectedPlaylistName);
        UserService.CreatePlaylist(selectedPlaylistName);
        //alert.show('Oh look, an alert!');
        setOpen(false);
    };
    const handlePlaylistName = (event) => {
        setSelectedPlaylistName(event.target.value);
    };


    useEffect(() => {
        UserService.friends()
            .then(friends => { 
                setCountFriends(friends.length);
            }).catch(e => console.error(e));
        UserService.groups()
            .then(groups => {
                setCountGroups(groups.member.length);
            }).catch(e => console.error(e));
    }, [])


    return (
        <div>
            <Dialog
                aria-labelledby="form-dialog-title"
                onClose={handleClose}
                open={open}
            >
                <DialogTitle id="form-dialog-title">Save To Playlist</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter playlist name:
                    </DialogContentText>
                    <Grid>
                        <TextField
                            InputProps={{ inputProps: { min: 1, max: 10 } }}
                            fullWidth
                            label="Playlist Name"
                            margin="dense"
                            type="String"
                            //value={selectedValueMaskRange}
                            onChange={handlePlaylistName}
                            value={selectedPlaylistName}

                        />
                        <span className={classes.spacer}/>
                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={SavePlaylist}
                    >
                        Save Playlist
                    </Button>
                    <Button
                        color="primary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>


            <Grid
                className={classes.root}
                container
                spacing={3}
            >
                <Grid
                    item
                    xs={12}
                >
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography color="text-primary"> Profile </Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid
                    item
                    lg={2}
                    md={3}
                    sm={4}
                    xs={5}
                >
                    <Card>
                        <CardContent style={{textAlign: 'center'}}>
                            <Typography
                                color="primary"
                                variant="h1"
                            > {countFriends} </Typography>
                            <Typography variant="h5"> { countFriends === 1 ? 'Friend' : 'Friends' } </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                onClick={() => props.history.push('/friends')}
                                size="small"
                            > Manage </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid
                    item
                    lg={2}
                    md={3}
                    sm={4}
                    xs={5}
                >
                    <Card>
                        <CardContent style={{textAlign: 'center'}}>
                            <Typography
                                color="primary"
                                variant="h1"
                            > {countGroups} </Typography>
                            <Typography variant="h5"> { countGroups === 1 ? 'Group' : 'Groups' } </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                onClick={() => props.history.push('/groups')}
                                size="small"
                            > Manage </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid
                    item
                    md={7}
                    xs={12}
                >
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography
                                className={classes.title}
                                color="textSecondary"
                                gutterBottom
                                variant="h5"
                            >
                            PLAYLIST
                            </Typography>
                            <CardActions>
                                <Grid allign = "row" >
                                    <Button size="small">Share Playlist</Button>
                                    <Button
                                        onClick={() => handleClickOpen()} 
                                        size="small"
                                    >Create New Playlist</Button>
                                </Grid>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid
                    item
                    md={7}
                    xs={12}
                >
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography
                                className={classes.title}
                                color="textSecondary"
                                gutterBottom
                                variant="h5"
                            >
                            SETTINGS
                            </Typography>

                        </CardContent>
                        <CardActions>
                            <Grid allign = "row" >
                                <Button size="small">View settings</Button>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

Profile.propTypes = {
    history: PropTypes.object
};
export default withRouter(Profile);
