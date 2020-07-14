import React, {useState, useEffect} from 'react';
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
import { UserService } from '../../service';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        flexGrow: 1,
    }
}));

const Profile = props => {
    const classes = useStyles();
    const [countFriends, setCountFriends] = React.useState(0);
    const [countGroups, setCountGroups] = React.useState(0);

    useEffect(() => {
        /*UserService.friends()
            .then(friends => { 
                setCountFriends(friends.length);
            }).catch(e => console.error(e));*/
        UserService.groups()
            .then(groups => { 
                setCountGroups(groups.member.length);
            }).catch(e => console.error(e));
    }, [])

    return (
        <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text-primary"> Profile </Typography>
                </Breadcrumbs>
            </Grid>
            <Grid item xs={5} sm={4} md={3} lg={2}>
                <Card>
                    <CardContent style={{textAlign: 'center'}}>
                        <Typography variant="h1" color="primary"> {countFriends} </Typography>
                        <Typography variant="h5"> { countFriends == 1 ? 'Friend' : 'Friends' } </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => props.history.push('/friends')}> Manage </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={5} sm={4} md={3} lg={2}>
                <Card>
                    <CardContent style={{textAlign: 'center'}}>
                        <Typography variant="h1" color="primary"> {countGroups} </Typography>
                        <Typography variant="h5"> { countGroups == 1 ? 'Group' : 'Groups' } </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => props.history.push('/groups')}> Manage </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item md={7} xs={12} >
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
            </Grid>
            <Grid item md={7} xs={12} >
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
        </Grid>
    );
};

Profile.propTypes = {
    history: PropTypes.object
};
export default withRouter(Profile);
