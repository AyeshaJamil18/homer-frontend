import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {},
    item: {
        display: 'flex',
        flexDirection: 'column'
    }
}));

const Notifications = props => {
    const { className, ...rest } = props;

    const classes = useStyles();

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <form>
                <CardHeader
                    subheader="Manage the reminder settings"
                    title="Reminder Alerts"
                />
                <Divider/>
                <CardContent>
                    <Grid
                        container
                        spacing={6}
                        wrap="wrap"
                    >
                        <Grid
                            className={classes.item}
                            item
                            md={8}
                            sm={6}
                            xs={12}
                        >
                            <Typography
                                gutterBottom
                                variant="h6"
                            >
                                Notifications
                            </Typography>
                            <div>
                                <input type="radio" value="Male" name="gender" />  Remind me every
                            </div>
                            <div>
                                <input type="radio" value="Female" name="gender" /> Remind me at fixed times
                             </div>

                        </Grid>

                    </Grid>
                </CardContent>
                <Divider/>
                <CardActions>
                    <Button
                        color="primary"
                        variant="outlined"
                    >
                        Save
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

Notifications.propTypes = {
    className: PropTypes.string
};

export default Notifications;
