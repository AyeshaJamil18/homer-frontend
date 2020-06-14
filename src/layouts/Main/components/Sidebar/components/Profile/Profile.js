import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography } from '@material-ui/core';
import { AuthService, UserService } from '../../../../../../service';

let UserName;
let Name;


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'fit-content'
    },
    avatar: {
        width: 60,
        height: 60
    },
    name: {
        marginTop: theme.spacing(1)
    },
    logoutButton: {
        margin: theme.spacing(2, 0)
    }
}));

const Profile = props => {
    const [LoggedInUserName, setLoggedInUserName] = React.useState('');

    const [LoggedInName, setLoggedInName] = React.useState('');

    const handlesetLoggedInUserName = () => {
        setLoggedInUserName(UserName);
    };
    const handlesetLoggedInName = () => {
        setLoggedInName(Name);
    };
    const { className, ...rest } = props;
    let history = useHistory();
    const classes = useStyles();

    const LogoutClick = () => {
        AuthService.logout();
        history.push({
            pathname: '/sign-in'
        });
    };


    const DisplayUserFullName = () => {
        return UserService.getCurrentUserData().then(data => {

            UserName = data.username;
            Name = data.firstName + ' ' + data.lastName;
            handlesetLoggedInUserName();
            handlesetLoggedInName();

        }).catch(response => {

            history.push({
                pathname: '/sign-in'
            });
        })
    };


    useEffect( () => {
        const fetch = async () => {
            await DisplayUserFullName();
        }

        fetch();
    });

    return <div
        {...rest}
        className={clsx(classes.root, className)}
           >

        <Typography
            className={classes.name}
            variant="h4"
        >
            {LoggedInName}

        </Typography>
        <Typography
            className={classes.name}
            variant="h6"
        >
            {LoggedInUserName}
        </Typography>

        <Button
            className={classes.logoutButton}
            color="primary"
            onClick={LogoutClick}
            size="large"
            variant="contained"
        >
            Log Out
        </Button>

    </div>;
};

Profile.propTypes = {
    className: PropTypes.string
};

export default Profile;
