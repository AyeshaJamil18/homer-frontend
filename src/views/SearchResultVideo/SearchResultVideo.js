import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Radio
} from '@material-ui/core';
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
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };


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
            <Typography
                className={classes.name}
                variant="h1"
            >
                Search results for {location.state.TagName}
            </Typography>

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

                               url={document.videoUrl}
                           />
                            <Button
                                onClick={() => handleClickOpen()}>
                                Add to playlist
                            </Button>
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
