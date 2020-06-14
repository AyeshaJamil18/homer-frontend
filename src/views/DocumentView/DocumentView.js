import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { DocumentViewTable } from './components';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const DocumentView = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* <UsersToolbar /> */}
            <div className={classes.content}>
                <DocumentViewTable />
            </div>
        </div>
    );
};

export default DocumentView;
