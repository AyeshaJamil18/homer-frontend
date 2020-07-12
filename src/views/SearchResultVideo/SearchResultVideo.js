import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { VideoService } from '../../service';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));



let DocumentList=[];
const SearchResultVideo = props => {
    const classes = useStyles();
    let location = useLocation();
    let history = useHistory();


    const onSearchClick = () => {


        VideoService.GetVideoByTag(location.state.TagName)
            .then(data => {
                DocumentList=data;
                console.log(DocumentList)
            })
            .catch((e) => {
                console.log(e);
            });

    };
    return (
        <div className={classes.root}>
            this is search result page
            {onSearchClick()}
        </div>
    );
};

export default SearchResultVideo;
