import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Breadcrumbs } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        flexGrow: 1,
    }
}));

const Profile = props => {
    const classes = useStyles();
    const { history } = props;

    const HandleFriends = () => {

        history.push({
            pathname: '/friends'
        });
    };


    return (
        <div className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text-primary"> Profile </Typography>
            </Breadcrumbs>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Card className={classes.root}>
                        <CardContent style={{textAlign: 'center'}}>
                            <Typography style={{fontSize: 42}} color="primary"> 21 </Typography>
                            <Typography variant="h5"> Friends </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={HandleFriends}> Manage </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <Card className={classes.root}>
                        <CardContent style={{textAlign: 'center'}}>
                            <Typography style={{fontSize: 42}} color="primary"> 4 </Typography>
                            <Typography variant="h5"> Groups </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={HandleFriends}> Manage </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <Grid
                item
                md={7}
                xs={12}
            >
            <Card className={classes.root}>
                <CardContent>
                    <Typography  variant="h5" className={classes.title} color="textSecondary" gutterBottom>
                       PLAYLIST
                    </Typography>
                    <CardActions>
                        <Grid allign = 'row' >
                            <Button size="small">Share Playlist</Button>
                            <Button size="small">Create New Playlist</Button>
                        </Grid>
                    </CardActions>
                </CardContent>

            </Card>
                <div>

                </div>
            </Grid>
                <Grid
                    item
                    md={7}
                    xs={12}
                >
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title}  variant="h5" color="textSecondary" gutterBottom>
                        SETTINGS
                    </Typography>

                </CardContent>
                <CardActions>
                    <Grid allign = 'row' >
                        <Button size="small">View settings</Button>
                    </Grid>
                </CardActions>
            </Card>
                </Grid>
        </div>
    );
};

Profile.propTypes = {
    history: PropTypes.object
};
export default withRouter(Profile);
