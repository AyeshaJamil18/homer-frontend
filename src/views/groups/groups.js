import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
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
                
            </Card>
            </Grid>
        </div>
    );
};

export default Groups;
