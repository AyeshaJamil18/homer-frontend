import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Button, FormHelperText, Grid, TextField, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { VideoService } from '../../service';

let ErrorMessage = '';
const schema = {
    VideoTitle: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 64
        }
    },
    Keywords: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
    },
    Category: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
    },
    Duration: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
    },
    videoUrl: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
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



    const handleSignUp = event => {
        event.preventDefault();

        VideoService.saveVideo(formState.values.VideoTitle,
            formState.values.Keywords,
            formState.values.category,
            formState.values.videoUrl,
            formState.values.Duration,
            'Admin')
            .then((res) => {
                console.log(res);
                console.log('Video saved');
                ErrorMessage = 'Video Saved';
                
                history.push({
                    pathname: '/Admin-Dashboard'
                });
                handleClickOpen();

            }).catch(response => {
                
                if (response.status===1212) {
                    ErrorMessage = 'Did not find Server';
                    handleClickOpen();
                }
                else{
                    ErrorMessage = 'video already exist';
                    handleClickOpen();
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
                <DialogTitle id="alert-dialog-title">{'Video'}</DialogTitle>
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
                    className={classes.content}
                    item
                    lg={7}
                    xs={12}
                >
                    <div className={classes.content}>

                        <div className={classes.contentBody}>
                            <form
                                className={classes.form}
                                onSubmit={handleSignUp}
                            >
                                <Typography
                                    className={classes.title}
                                    variant="h2"
                                >
                                    Upload Video
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                >
                                   Add video URL along with its categories
                                </Typography>
                                <TextField
                                    className={classes.textField}
                                    error={hasError('VideoTitle')}
                                    fullWidth
                                    helperText={
                                        hasError('VideoTitle') ? formState.errors.VideoTitle[0] : null
                                    }
                                    label="Video Title"
                                    name="VideoTitle"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.values.VideoTitle || ''}
                                    variant="outlined"
                                />

                                <TextField
                                    className={classes.textField}
                                    error={hasError('Keywords')}
                                    fullWidth
                                    helperText={
                                        hasError('Keywords') ? formState.errors.Keywords[0] : null
                                    }
                                    label="Keywords "
                                    multiline
                                    name="Keywords"
                                    onChange={handleChange}
                                    type="text"
                                    rows={4}
                                    value={formState.values.Keywords || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    error={hasError('Category')}
                                    fullWidth
                                    helperText={
                                        hasError('Category') ? formState.errors.Category[0] : null
                                    }
                                    label="Categories"
                                    multiline
                                    name="Category"
                                    onChange={handleChange}
                                    type="text"
                                    rows={4}
                                    value={formState.values.Category || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    error={hasError('videoUrl')}
                                    fullWidth
                                    helperText={
                                        hasError('videoUrl') ? formState.errors.videoUrl[0] : null
                                    }
                                    label="Video Url"
                                    name="videoUrl"
                                    onChange={handleChange}
                                    value={formState.values.videoUrl || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    error={hasError('Duration')}
                                    fullWidth
                                    helperText={
                                        hasError('Duration') ? formState.errors.Duration[0] : null
                                    }
                                    label="Points Assigned"
                                    name="Duration"
                                    onChange={handleChange}
                                    type="number"
                                    value={formState.values.Duration || ''}
                                    variant="outlined"
                                />


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
                                    Save Video
                                </Button>
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
