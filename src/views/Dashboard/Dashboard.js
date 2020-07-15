import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Typography  } from '@material-ui/core';
import { VideoService } from '../../service';
import ReactPlayer from 'react-player'

let Video_Name='';
let Video_URL='';

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

    const handlesetVideoName = () => {
        setVideoName(Video_Name);
    };
    const handlesetVideoURL= () => {
        setVideoURL(Video_URL);
    };

    const VideoOfTheDay = () => {
        return VideoService.GetvideoOfTheDay()
            .then(data => {
                console.log(data);
                console.log(JSON.stringify(data[0]['videoTitle']));
                Video_Name=data[0]['videoTitle'];
                Video_URL=data[0]['videoUrl'];
                handlesetVideoName(Video_Name);
                handlesetVideoURL(Video_URL);
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

    return <div
        {...rest}
        className={clsx(classes.root, className)}
           >
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
            url={Video_URL}
        />

    </div>

};

Dashboard.propTypes = {
    className: PropTypes.string
};


export default Dashboard;
