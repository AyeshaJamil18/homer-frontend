import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles  } from '@material-ui/styles';
import { AppBar, Hidden, IconButton, Typography, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchField from 'react-search-field';

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
    const { className, onSidebarOpen, ...rest } = props;

    const classes = useStyles();

    let onSearchClick;
    return (
        <AppBar
            {...rest}
            className={clsx(classes.root, className)}
        >
            <Toolbar>
                <RouterLink to="/">

                    <Typography variant="h1" className={classes.title}>
                        HOMER
                    </Typography>
                </RouterLink>
                <div className={classes.flexGrow}/>
                <SearchField
                    placeholder='Search item'
                    onSearchClick={onSearchClick}
                />
                <Hidden lgUp>
                    <IconButton
                        color="inherit"
                        onClick={onSidebarOpen}
                    >
                        <MenuIcon/>
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

Topbar.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func
};

export default Topbar;
