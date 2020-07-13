import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { UserService } from '../../service';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        flexGrow: 1,
    }
}));

const Groups = () => {
    const classes = useStyles();
    const [memberGroups, setMemberGroups] = React.useState([]);

    useEffect(() => {
        UserService.groups()
            .then(groups => { setMemberGroups(groups); })
            .catch(e => console.error(e));
    }, [])
    
    return (
        <div className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/profile"> Profile </Link>
                <Typography color="text-primary"> Groups </Typography>
            </Breadcrumbs>
            <Grid
                item
                md={7}
                xs={12}
            >
            <Card className={classes.root}>
                <List> { memberGroups.map((group) => (
                    <ListItem>
                    <ListItemAvatar>
                        { /* TODO Group pictues */ }
                    </ListItemAvatar>
                    <ListItemText
                        primary={ group }
                    />
                    </ListItem> ))}
                </List>
            </Card>
            </Grid>
        </div>
    );
};

export default Groups;
