import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useLocation } from 'react-router-dom';
import { PlaylistService, VideoService } from '../../service';
import ReactPlayer from 'react-player';
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Typography
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));


const SearchResultVideo = () => {
    const classes = useStyles();
    let location = useLocation();
    const [showVideo, setshowVideo] = React.useState(false);
    const [documentList, setDocumentList] = React.useState([]);
    const [documentList_add, setDocumentList_add] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [VideoID, setVideoID] = React.useState('');


    useEffect(() => { onSearchClick(); }, []);

    const onSearchClick = () => {
        VideoService.GetVideoByTag(location.state.TagName)
            .then(data => {
                setDocumentList(data.docs);
                console.log(data.docs);
                setshowVideo(true);

            })
            .catch((e) => {
                console.log(e);
            });

    };


    const GetUSerPlaylist = () =>{
        PlaylistService.GetPlaylist()
            .then(data => {
                setDocumentList_add(data.docs);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = (_idVideo) => {

        GetUSerPlaylist();
        setOpen(true);
        console.log(_idVideo);
        setVideoID(_idVideo);
    };

    const AddToSpecificPlaylist =(Playlist_name) =>
    {

        PlaylistService.AddVideo(Playlist_name,VideoID);
        setOpen(false);
    };


    const callonEnd = () =>
    {
                console.log("This video has ended");
    };

    return (
        <div className={classes.root}>
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
                            { documentList_add.map((document)  => (
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
                           <button
                               onClick={() => handleClickOpen(document._id)}
                           >
                               Add To PlayList
                           </button>
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
