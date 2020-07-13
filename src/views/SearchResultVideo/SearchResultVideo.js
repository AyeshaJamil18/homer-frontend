import React from 'react';
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



let DocumentList={};
const SearchResultVideo = props => {
    const classes = useStyles();
    let location = useLocation();
    let history = useHistory();
    const [showVideo, setshowVideo] = React.useState(false);


    const onSearchClick = () => {
        VideoService.GetVideoByTag(location.state.TagName)
            .then(data => {
                DocumentList=data;

                setshowVideo(true);
                // Object.keys(DocumentList).map((position, index) => {
                //     console.log( DocumentList[position][index].videoTitle)
                // })
                console.log(DocumentList)
            })
            .catch((e) => {
                console.log(e);
            });

    };
    return (
        <div className={classes.root}>

            {onSearchClick()}




            {Object.keys(DocumentList).map((item,index) => {
            //{DocumentList.Video.map((Video, index)  => {
                return (
                    showVideo ? (
                        <div  >
                            this is wierd
                            {DocumentList[item][index].videoTitle}
                            {DocumentList[item][index].videoTitle}
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
