import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { VideoService } from '../../service';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const VideoOfTheDay = () => {
    VideoService.GetvideoOfTheDay()
        .then(data => {
            console.log(data)
        })
        .catch((e) => {
            console.log(e);
        });

};

const Dashboard = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {VideoOfTheDay()}
        </div>
    );
};

export default Dashboard;
