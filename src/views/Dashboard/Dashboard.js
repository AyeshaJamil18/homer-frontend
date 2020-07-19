import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    CardActions,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Typography,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import { VideoService , UserService, PlaylistService} from '../../service';
import ReactPlayer from 'react-player'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        flexGrow: 1,
    }
}));

const Dashboard = props => {

    const classes = useStyles();
    const { className, ...rest } = props;
    const [videoName, setVideoName] = React.useState('');
    const [videoURL, setVideoURL] = React.useState('');
    const [videoID, setVideoID] = React.useState('');
    const [videoXP, setVideoXP] = React.useState('');
    const [addToPlaylistDialogOpen, setAddToPlaylistDialogOpen] = React.useState(false);
    const [videoEndDialogOpen, setVideoEndDialogOpen] = React.useState(false);
    const [documentList, setDocumentList] = React.useState([]);

    useEffect(() => { VideoOfTheDay(); }, []);

    const GetUserPlaylist = () => {
        PlaylistService.GetPlaylist()
            .then(data => {
                console.log(data);
                console.log(data.docs);
                setDocumentList(data.docs);
                console.log(documentList);
            })
            .catch((e) => { console.error(e); });
    };

    const handleClickOpen = () => {
        GetUserPlaylist();
        setAddToPlaylistDialogOpen(true);
    };
    const AddToSpecificPlaylist =(Playlist_name) => {
        PlaylistService.AddVideo(Playlist_name, videoID);
        setAddToPlaylistDialogOpen(false);
    };

    const VideoOfTheDay = () => {
        VideoService.videoOfTheDay()
            .then(video => {
                setVideoName(video.videoTitle);
                setVideoURL(video.videoUrl);
                setVideoID(video.id);
                setVideoXP(video.duration);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    
    const callonEnd = () => {
        console.log('This video has ended');
        setVideoEndDialogOpen(true);
    };
    const AddPointsToRecords = () => {
        console.log('This video has ended');
        setVideoEndDialogOpen(false);
        UserService.addXP(videoXP)
    };

    return (
        <Grid container spacing={3} className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text-primary"> Dashboard </Typography>
            </Breadcrumbs>
            <Dialog
                aria-labelledby="form-dialog-title"
                onClose={() => { setVideoEndDialogOpen(false); }}
                open={videoEndDialogOpen}
            >
                <DialogTitle id="form-dialog-title">Video Points</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add Video points {videoXP} to your profile:
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={AddPointsToRecords}> Yes </Button>
                    <Button color="primary" onClick={() => { setVideoEndDialogOpen(false); }}> No </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                aria-labelledby="form-dialog-title"
                onClose={() => { setAddToPlaylistDialogOpen(false); }}
                open={addToPlaylistDialogOpen}
            >
                <DialogTitle id="form-dialog-title">Save To Playlist</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select the playlist from the following:
                    </DialogContentText>
                    <List>
                        { documentList.map((document)  => (
                            <ListItem>
                                <ListItemText
                                    primary = {document.title}
                                />
                                <ListItemSecondaryAction>
                                    <Button onClick={() => AddToSpecificPlaylist(document._id) } > Add </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => { setAddToPlaylistDialogOpen(false); }}> Cancel </Button>
                </DialogActions>
            </Dialog>

            <Grid item md={7} xs={12}>
                <Card>
                    <CardContent>
                        <Typography className={classes.name} variant="h2"> Video Of The Day </Typography>
                        <Typography className={classes.name} variant="h4"> {videoName} </Typography>

                        <ReactPlayer controls onEnded={callonEnd} url={videoURL} />
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => handleClickOpen()} > Add to playlist </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )};

Dashboard.propTypes = {
    className: PropTypes.string
};


export default Dashboard;
