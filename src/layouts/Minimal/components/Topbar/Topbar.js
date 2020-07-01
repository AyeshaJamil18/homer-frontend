import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar,Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none',
        background: '#FC4C02'
    },
    flexGrow: {
        flexGrow: 1
    },
    signOutButton: {
        marginLeft: theme.spacing(1)
    },
    title:
        {
         color: 'white'
        }

}));

const Topbar = props => {
    const { className, ...rest } = props;

    const classes = useStyles();

    return (
        <AppBar
            {...rest}
            className={clsx(classes.root, className)}
            color="primary"
            position="fixed"
        >
            <Toolbar>
                <RouterLink to="/dashboard">
                    <Typography variant="h1" className={classes.title}>
                        HOMER
                    </Typography>
                </RouterLink>
            </Toolbar>
        </AppBar>
    );
};

Topbar.propTypes = {
    className: PropTypes.string
};

export default Topbar;
