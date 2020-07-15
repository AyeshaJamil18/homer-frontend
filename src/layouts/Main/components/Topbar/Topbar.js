import React, { useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
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
    const { history,className, onSidebarOpen, ...rest } = props;

    const classes = useStyles();

    const [notifications] = useState([]);


    const onSearchClick = (e) => {

        history.push({
            pathname: '/SearchResultVideo',
            state: {
                TagName: e
            }

        });
    };
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
                    onSearchClick={(e) => onSearchClick(e)}

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


Topbar.propTypes = {
    history: PropTypes.object
};
export default withRouter(Topbar);
