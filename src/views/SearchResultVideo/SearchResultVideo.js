import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { VideoService } from '../../service';
import ReactPlayer from "react-player"

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
    return (
        <div className={classes.root}>

            {documentList.map((document) => {
                return (
                    showVideo ? (
                        <div  >
                            this is wierd
                            {document.videoTitle}
                            {document.videoUrl}
                            {/*<ReactPlayer*/}
                            {/*    url="https://www.youtube.com/watch?v=ug50zmP9I7s"*/}
                            {/*/>*/}
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
