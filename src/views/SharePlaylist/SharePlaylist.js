import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        flexGrow: 1,
    }
}));

const SharePlaylist = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Playlists
            </Typography>

            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title}  variant="h5" color="textSecondary" gutterBottom>
                        View
                        Share
                    </Typography>

                </CardContent>

            </Card>
        </div>
    );
};

export default SharePlaylist;
