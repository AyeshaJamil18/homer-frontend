import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
    MyPublicUploads,
    MyUploads,
    SharedWithMePrivately,
    SharedWithMePublicly,
    TotalDocuments,
    TotalGlobalDocuments,
    TotalUsers
} from './components';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const Personal = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={4}
            >
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={1}
                    xs={12}
                >

                </Grid>
            </Grid>
        </div>
    );
};

export default Personal;
