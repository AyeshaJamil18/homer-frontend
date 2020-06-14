import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

import LoadingSpinner from 'react-loader-spinner';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        fontWeight: 700
    },
    difference: {
        marginTop: theme.spacing(2),
        display: 'flex',
        alignItems: 'center'
    },
    differenceIcon: {
        color: theme.palette.success.dark
    },
    differenceValue: {
        color: theme.palette.success.dark,
        marginRight: theme.spacing(1)
    }
}));

const DisplayValueCard = props => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const [asyncValue, asyncValueSet] =
        useState(<LoadingSpinner type="ThreeDots" height={60}/>);

    useEffect(() => {
        if (props.promise) {
            const fetchData = async () => {
                await props.promise
                    .then(result => asyncValueSet(result))
                    .catch(error => console.log(error));
            };

            fetchData();
        }
    }, []);

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardContent>
                <Grid
                    container
                    justify="space-between"
                >
                    <Grid item>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >{props.headtitle}
                        </Typography>
                        <Typography variant="h3">{asyncValue}</Typography>
                    </Grid>
                    <Grid item>
                        {props.icon}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

DisplayValueCard.propTypes = {
    className: PropTypes.string
};

export default DisplayValueCard;
