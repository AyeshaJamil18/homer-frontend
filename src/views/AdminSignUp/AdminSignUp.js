import React, { useEffect, useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Button, Checkbox, FormHelperText, Grid, IconButton, Link, TextField, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { AdminAuthService } from '../../service';

let ErrorMessage = '';

const schema = {
    userName: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32
        },
        format: {
            pattern: '^[a-zA-Z0-9_]*$',
            flags: 'i',
            message: 'can only contain English Alphabets and Numbers from 0-9'
        }
    },
    firstName: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32
        }
    },
    lastName: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32
        }
    },
    email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true,
        length: {
            maximum: 64
        }
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        format: {
            pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&,.#\\+\\-\\=\\_~])[A-Za-z\\d@$!%*?&,.#\\+\\-\\=\\_~]{8,30}$',
            flags: 'i',
            message: 'must have a minimum of 8 characters, one capital letter, one number, one special character (@$!%*?&,.#+-=_~) and only English alphabets are allowed.'
        },
        length: {
            maximum: 30,
            minimum: 8,
            message: 'Minimum 8 characters required'
        }
    },
    policy: {
        presence: { allowEmpty: false, message: 'is required' },
        checked: true
    }
};

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%'
    },
    grid: {
        height: '100%'
    },
    quoteContainer: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    quote: {
        backgroundColor: theme.palette.neutral,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/images/ASSET-USER-ADMIN.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    quoteInner: {
        textAlign: 'center',
        flexBasis: '600px'
    },
    quoteText: {
        color: theme.palette.white,
        fontWeight: 300
    },
    name: {
        marginTop: theme.spacing(3),
        color: theme.palette.white
    },
    bio: {
        color: theme.palette.white
    },
    contentContainer: {},
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    contentHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(5),
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    logoImage: {
        marginLeft: theme.spacing(4)
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        }
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    title: {
        marginTop: theme.spacing(3)
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    policy: {
        marginTop: theme.spacing(1),
        display: 'flex',
        alignItems: 'center'
    },
    policyCheckbox: {
        marginLeft: '-14px'
    },
    signUpButton: {
        margin: theme.spacing(2, 0)
    }
}));

const SignUp = props => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const { history } = props;

    const classes = useStyles();

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
    });

    useEffect(() => {
        const errors = validate(formState.values, schema);

        setFormState(formState => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {}
        }));
    }, [formState.values]);

    const handleChange = event => {
        event.persist();

        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true
            }
        }));
    };

    const handleBack = () => {
        history.goBack();
    };

    const handleSignUp = event => {
        event.preventDefault();

        AdminAuthService.register(formState.values.userName,
            formState.values.email,
            formState.values.firstName,
            formState.values.lastName,
            formState.values.password)
            .then(() => {
                history.push({
                    pathname: '/Admin-Dashboard'
                });

            }).catch(response => {
                if (response && response.status) {
                    if (response.status === 404) {
                        ErrorMessage = 'Did not find Server';
                        handleClickOpen();
                    } else if (response.status === 409) {
                        return response.json().then((res) => {
                            console.log(res);
                            if (res) {
                                //ErrorMessage = e;
                                if (res.error === 'Username exists') {
                                    ErrorMessage = 'Entered User Name ' + formState.values.userName + ' Already Exists';
                                } else if (res.error === 'Email exists') {
                                    ErrorMessage = 'Entered Email ' + formState.values.email + ' Already Exists';
                                } else {
                                    ErrorMessage = 'Internal Server Error';
                                }

                                handleClickOpen();
                            }
                        });
                    } else if (response.status === 500) {

                        return response.text().then(message =>
                        {
                            ErrorMessage = 'Internal server error with message ' + message;
                            handleClickOpen();
                        })

                    }
                }
            });
    };

    const hasError = field =>
        formState.touched[field] && formState.errors[field] ? true : false;

    return (
        <div className={classes.root}>
            <Dialog
                aria-describedby="alert-dialog-description"
                aria-labelledby="alert-dialog-title"

                onClose={handleClose}
                open={open}
            >
                <DialogTitle id="alert-dialog-title">{'Sign up Error'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        {ErrorMessage}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        color="primary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid
                className={classes.grid}
                container
            >
                <Grid
                    className={classes.quoteContainer}
                    item
                    lg={5}
                >
                    <div className={classes.quote}>
                        <div className={classes.quoteInner} />
                    </div>
                </Grid>
                <Grid
                    className={classes.content}
                    item
                    lg={7}
                    xs={12}
                >
                    <div className={classes.content}>
                        <div className={classes.contentHeader}>
                            <IconButton onClick={handleBack}>
                                <ArrowBackIcon/>
                            </IconButton>
                        </div>
                        <div className={classes.contentBody}>
                            <form
                                className={classes.form}
                                onSubmit={handleSignUp}
                            >
                                <Typography
                                    className={classes.title}
                                    variant="h2"
                                >
                                    Create New Admin Account
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                >
                                    Use your email to create new admin account
                                </Typography>
                                <TextField
                                    className={classes.textField}
                                    error={hasError('userName')}
                                    fullWidth
                                    helperText={
                                        hasError('userName') ? formState.errors.userName[0] : null
                                    }
                                    label="User Name"
                                    name="userName"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.values.userName || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    error={hasError('firstName')}
                                    fullWidth
                                    helperText={
                                        hasError('firstName') ? formState.errors.firstName[0] : null
                                    }
                                    label="First name"
                                    name="firstName"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.values.firstName || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    error={hasError('lastName')}
                                    fullWidth
                                    helperText={
                                        hasError('lastName') ? formState.errors.lastName[0] : null
                                    }
                                    label="Last name"
                                    name="lastName"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.values.lastName || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    error={hasError('email')}
                                    fullWidth
                                    helperText={
                                        hasError('email') ? formState.errors.email[0] : null
                                    }
                                    label="Email address"
                                    name="email"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.values.email || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    error={hasError('password')}
                                    fullWidth
                                    helperText={
                                        hasError('password') ? formState.errors.password[0] : null
                                    }
                                    label="Password"
                                    name="password"
                                    onChange={handleChange}
                                    type="password"
                                    value={formState.values.password || ''}
                                    variant="outlined"
                                />
                                <div className={classes.policy}>
                                    <Checkbox
                                        checked={formState.values.policy || false}
                                        className={classes.policyCheckbox}
                                        color="primary"
                                        name="policy"
                                        onChange={handleChange}
                                    />
                                    <Typography
                                        className={classes.policyText}
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        I have read the{' '}
                                        <Link
                                            color="primary"
                                            component={RouterLink}
                                            to="#"
                                            underline="always"
                                            variant="h6"
                                        >
                                            Terms and Conditions
                                        </Link>
                                    </Typography>
                                </div>
                                {hasError('policy') && (
                                    <FormHelperText error>
                                        {formState.errors.policy[0]}
                                    </FormHelperText>
                                )}
                                <Button
                                    className={classes.signUpButton}
                                    color="primary"
                                    disabled={!formState.isValid}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Sign up now
                                </Button>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    Have an account?{' '}
                                    <Link
                                        component={RouterLink}
                                        to="/admin-sign-in"
                                        variant="h6"
                                    >
                                       Admin Sign in
                                    </Link>
                                </Typography>
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

SignUp.propTypes = {
    history: PropTypes.object
};

export default withRouter(SignUp);
