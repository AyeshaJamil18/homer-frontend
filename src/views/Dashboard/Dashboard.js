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

import { VideoService , UserService} from '../../service';
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
    const handleClickOpen = () => {
        setOpen(true);
    };

    const VideoOfTheDay = () => {
        return VideoService.GetvideoOfTheDay()
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
            await VideoOfTheDay();
        }
        fetch();
    },[count]);


    const callonEnd = () =>
    {
        console.log("This video has ended");
        setOpen_VideoEnd(true);
    };
    const AddPointsToRecords = () =>
    {
        console.log("This video has ended");
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
                    <Radio
                        //checked={selectedValue === 'None'}
                        inputProps={{ 'aria-label': 'None' }}
                        name="radio-button-demo"
                        //onChange={handleRadioChange}
                        value="None"
                    />
                    <label>None</label>
                    <span className={classes.spacer}/>
                </Grid>
                {/* {selectedValue == 'None'} */}

                <Grid>
                    <Radio
                        //checked={selectedValue === 'Random Sort'}
                        inputProps={{ 'aria-label': 'Random Sort' }}
                        name="radio-button-demo"
                        //onChange={handleRadioChange}
                        value="Random Sort"
                    />
                    <label>Random Sort</label>
                    <span className={classes.spacer}/>
                </Grid>
                {/* {selectedValue == 'Random'} */}

            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                >
                    Save video
                </Button>
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
            controls={true}
            onEnded={ callonEnd}
            url={Video_URL}
        />
        <Button
            onClick={() => handleClickOpen()}>
            Add to playlist
        </Button>

    </div>

};

Dashboard.propTypes = {
    className: PropTypes.string
};


export default Dashboard;
