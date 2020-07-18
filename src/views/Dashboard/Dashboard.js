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
    Grid,
    Radio,
    Typography,

} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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

    const [count, setCount] = React.useState(0);

    const [VideoName, setVideoName] = React.useState('');

    const [VideoURL, setVideoURL] = React.useState('');
    const [VideoID, setVideoID] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [open_videoEnd, setOpen_VideoEnd] = React.useState(false);
    const [documentList, setDocumentList] = React.useState([]);


    const handlesetVideoName = () => {
        setVideoName(Video_Name);
    };
    const handlesetVideoURL= () => {
        setVideoURL(Video_URL);
    };
    const handlesetVideoID= () => {
        setVideoID(Video_ID);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClose_videoEnd = () => {
        setOpen_VideoEnd(false);
    };

    const GetUSerPlaylist = () =>{
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
        console.log('in handle click open');
        GetUSerPlaylist();
        console.log('after func');
        setOpen(true);
    };
    const AddToSpecificPlaylist =(Playlist_name) =>
    {

        PlaylistService.AddVideo(Playlist_name,VideoID);
        setOpen(false);
    };

    const VideoOfTheDay = () => {
        VideoService.GetvideoOfTheDay()
            .then(data => {
                console.log(data);
                console.log(JSON.stringify(data[0]['videoTitle']));
                Video_Name          =data[0]['videoTitle'];
                Video_URL           =data[0]['videoUrl'];
                Video_ID           = data[0]['_id'];
                Video_Duration      = data[0]['duration'];
                console.log(Video_ID)
                handlesetVideoName(Video_Name);
                handlesetVideoURL(Video_URL);
                handlesetVideoID(Video_ID);
            })
            .catch((e) => {
                console.log(e);
            });

    };
    useEffect( () => {
        const fetch = async () => {
            await VideoOfTheDay()
        }
        fetch();
    },[count]);


    const callonEnd = () =>
    {
        console.log('This video has ended');
        setOpen_VideoEnd(true);
    };
    const AddPointsToRecords = () =>
    {
        console.log('This video has ended');
        setOpen_VideoEnd(false);
        UserService.addXP(Video_Duration)
    };


    return <div
        {...rest}
        className={clsx(classes.root, className)}
           >

        <Dialog
            aria-labelledby="form-dialog-title"
            onClose={handleClose_videoEnd}
            open={open_videoEnd}
        >
            <DialogTitle id="form-dialog-title">Video Points</DialogTitle>
            <DialogContent>
                <DialogContentText>
                       Add Video points {Video_Duration} to your profile:
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    onClick={AddPointsToRecords}
                >
                       Yes
                </Button>
                <Button
                    color="primary"
                    onClick={handleClose_videoEnd}
                >
                        No
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog
            aria-labelledby="form-dialog-title"
            onClose={handleClose}
            open={open}
        >
            <DialogTitle id="form-dialog-title">Save To Playlist</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Select the playlist  from the following:
                </DialogContentText>
                <Grid>
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
                        ))
                        }
                    </List>
                </Grid>

                {/* {selectedValue == 'None'} */}


            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>


        <Typography
            className={classes.name}
            variant="h2"
        >
            Video Of The Day
        </Typography>
        <Typography
            className={classes.name}
            variant="h4"
        >
            {Video_Name}
        </Typography>

        <ReactPlayer
            controls
            onEnded={callonEnd}
            url={Video_URL}
        />
        <Button
            onClick={() => handleClickOpen()}
        >
            Add to playlist
        </Button>

    </div>

};

Dashboard.propTypes = {
    className: PropTypes.string
};


export default Dashboard;
