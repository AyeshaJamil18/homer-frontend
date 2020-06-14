import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { DocumentListTable, DocumentListToolbar } from './components';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(1)
    }
}));

const PublicDocuments = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <DocumentListTable/>
            </div>
        </div>
    );
};

export default PublicDocuments;
