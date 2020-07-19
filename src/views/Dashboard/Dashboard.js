import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import { VideoService , UserService, PlaylistService} from '../../service';
import ReactPlayer from 'react-player'

let Video_Name='';
let Video_URL='';
let Video_ID='';
let Video_Duration='';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const Dashboard = props => {

    const classes = useStyles();
    const { className, ...rest } = props;
    //const [count, setCount] = React.useState(0);
    const [VideoName, setVideoName] = React.useState('');
    const [VideoURL, setVideoURL] = React.useState('');
    const [VideoID, setVideoID] = React.useState('');
    const [addToPlaylistDialogOpen, setAddToPlaylistDialogOpen] = React.useState(false);
    const [videoEndDialogOpen, setVideoEndDialogOpen] = React.useState(false);
    const [documentList, setDocumentList] = React.useState([]);

    useEffect(() => {  VideoOfTheDay(); }, []);

    //const handlesetVideoName = () => { setVideoName(Video_Name); };
    //const handlesetVideoURL= () => { setVideoURL(Video_URL); };
    //const handlesetVideoID= () => { setVideoID(Video_ID); };

    //const handleClose = () => {
    //    setOpen(false);
    //};
    //const handleClose_videoEnd = () => {
    //    setOpen_VideoEnd(false);
    //};

    const GetUserPlaylist = () => {
        PlaylistService.GetPlaylist()
            .then(data => {
                console.log(data);
                console.log(data.docs);
                setDocumentList(data.docs);
                console.log(documentList);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleClickOpen = () => {
        GetUserPlaylist();
        setAddToPlaylistDialogOpen(true);
    };
    const AddToSpecificPlaylist =(Playlist_name) => {
        PlaylistService.AddVideo(Playlist_name,VideoID);
        setAddToPlaylistDialogOpen(false);
    };

    const VideoOfTheDay = () => {
        VideoService.videoOfTheDay()
            .then(video => {
                //console.log(JSON.stringify(data[0]['videoTitle']));
                //Video_Name          =data[0]['videoTitle'];
                //Video_URL           =data[0]['videoUrl'];
                //Video_ID           = data[0]['_id'];
                //Video_Duration      = data[0]['duration'];
                //console.log(Video_ID)
                setVideoName(video.videoTitle);
                setVideoURL(video.videoUrl);
                setVideoID(video.id);
                //console.log(video);
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
        UserService.addXP(Video_Duration)
    };

    return <div {...rest} className={clsx(classes.root, className)}>

        <Dialog
            aria-labelledby="form-dialog-title"
            onClose={() => { setVideoEndDialogOpen(false); }}
            open={videoEndDialogOpen}
        >
            <DialogTitle id="form-dialog-title">Video Points</DialogTitle>
            <DialogContent>
                <DialogContentText>
                       Add Video points {Video_Duration} to your profile:
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


        <Typography className={classes.name} variant="h2"> Video Of The Day </Typography>
        <Typography className={classes.name} variant="h4"> {VideoName} </Typography>

        <ReactPlayer controls onEnded={callonEnd} url={VideoURL} />
        <Button onClick={() => handleClickOpen()} > Add to playlist </Button>
    </div>
};

Dashboard.propTypes = {
    className: PropTypes.string
};


export default Dashboard;
