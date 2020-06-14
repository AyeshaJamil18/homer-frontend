import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { EditorTable } from './components';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const Editor = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* <UsersToolbar /> */}
            <div className={classes.content}>
                <EditorTable />
            </div>
        </div>
    );
};

export default Editor;
