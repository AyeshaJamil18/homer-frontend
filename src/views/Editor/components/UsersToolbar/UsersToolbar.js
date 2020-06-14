import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Grid, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {},
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    spacer: {
        flexGrow: 1
    },
    importButton: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(3)
    },
    selection: {
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(3),
        width: '220px'
    },
    exportButton: {
        marginRight: theme.spacing(1)
    },
    searchInput: {
        marginRight: theme.spacing(1)
    }
}));

const UsersToolbar = props => {
    const { className, ...rest } = props;

    const classes = useStyles();
    const [values, setValues] = useState({
        column: 'Name',
        anonymization: 'Making'
    });

    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const columnNames = [
        {
            value: 'name',
            label: 'Name'
        },
        {
            value: 'email',
            label: 'Email'
        },
        {
            value: 'location',
            label: 'Location'
        },
        {
            value: 'phone',
            label: 'Phone'
        },
        {
            value: 'date',
            label: 'Registration Date'
        },
        {
            value: 'roomName',
            label: 'Room Name'
        },
        {
            value: 'latitude',
            label: 'Latitude'
        },
        {
            value: 'longitude',
            label: 'Longitude'
        }
    ];

    const anonymizationTechniques = [
        {
            value: 'masking',
            label: 'Masking'
        },
        {
            value: 'hashing',
            label: 'Hashing'
        },
        {
            value: 'random',
            label: 'Random'
        },
        {
            value: 'Generalization',
            label: 'Hashing'
        }
    ];

    return (
        <div
            {...rest}
            className={clsx(classes.root, className)}
        >
            <div className={classes.row}>
                <span className={classes.spacer}/>
                {/* <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button> */}
                <Button
                    color="primary"
                    variant="contained"
                >
                    Save Dataset
                </Button>
            </div>
            {/* <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search Data Field"
        />
      </div> */}
            <Grid
                item
                md={6}
                xs={12}
            >
                <TextField
                    className={classes.selection}
                    label="Select Columns"
                    margin="dense"
                    name="column"
                    onChange={handleChange}
                    required
                    select
                    // eslint-disable-next-line react/jsx-sort-props
                    SelectProps={{ native: true }}
                    value={values.columnNames}
                    variant="outlined"
                >
                    {columnNames.map(option => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <TextField
                    className={classes.selection}
                    label="Select Anonymization"
                    margin="dense"
                    name="anoymization"
                    onChange={handleChange}
                    required
                    select
                    // eslint-disable-next-line react/jsx-sort-props
                    SelectProps={{ native: true }}
                    value={values.anonymizationTechniques}
                    variant="outlined"
                >
                    {anonymizationTechniques.map(option => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <Button
                    onClick={() => alert('This is not implemented yet :)')}
                    color="primary"
                    variant="contained"
                    className={classes.importButton}>Apply</Button>
            </Grid>
        </div>
    );
};

UsersToolbar.propTypes = {
    className: PropTypes.string
};

export default UsersToolbar;
