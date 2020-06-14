import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar } from '@material-ui/core';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';

import StatsService from '../../../../../service/StatsService';
import DisplayValueCard from '../DisplayValueCard';

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
    avatar: {
        backgroundColor: '#3F51B5', //theme.palette.success.main,
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
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

const TotalDocuments = () => {
    const classes = useStyles();

    return (
        <DisplayValueCard promise={StatsService.getTotalDocumentCount()}
                          headtitle='TOTAL DOCUMENTS'
                          icon={<Avatar className={classes.avatar}>
                              <LibraryBooksOutlinedIcon className={classes.icon}/>
                          </Avatar>}
        />
    );
};

TotalDocuments.propTypes = {
    className: PropTypes.string
};

export default TotalDocuments;
