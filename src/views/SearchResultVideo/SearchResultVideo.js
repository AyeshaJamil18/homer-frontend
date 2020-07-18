import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { VideoService } from '../../service';
import ReactPlayer from 'react-player';
import { Typography  } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));


const SearchResultVideo = props => {
    const classes = useStyles();
    let location = useLocation();
    let history = useHistory();
    const [showVideo, setshowVideo] = React.useState(false);
    const [documentList, setDocumentList] = React.useState([]);

    useEffect(() => { onSearchClick(); }, []);

    const onSearchClick = () => {
        VideoService.GetVideoByTag(location.state.TagName)
            .then(data => {
                setDocumentList(data.docs);
                setshowVideo(true);
            })
            .catch((e) => {
                console.log(e);
            });

    };

    const callonEnd = () =>
    {
                console.log("This video has ended");
    };
    return (
        <div className={classes.root}>
            <Typography
                className={classes.name}
                variant="h1"
            >
                Search results for {location.state.TagName}
            </Typography>
            {documentList.map((document) => {
                return (
                    showVideo ? (
                        <div  >

                            <Typography
                                className={classes.name}
                                variant="h4"
                            >
                            {document.videoTitle}
                            </Typography>
                            <ReactPlayer
                                height ='300%'
                                width = '40%'
                                onEnded={ callonEnd}
                                controls={ true}
                               url={document.videoUrl}
                           />
                        </div>
                    ) : <div>
                        this is false
                    </div>
                );
            })}


        </div>
    );
};

export default SearchResultVideo;
