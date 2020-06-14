import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Chip from '@material-ui/core/Chip';

import { SearchInput } from 'components';

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
    chip: {
        marginRight: theme.spacing(1)
    },
    exportButton: {
        marginRight: theme.spacing(1)
    },
    searchInput: {
        marginRight: theme.spacing(1)
    }
}));

const DocumentListToolbar = props => {
    const { className, selectActiveChip, privacyOptions, ...rest } = props;

    const classes = useStyles();
    const PRIVATE = privacyOptions.PRIVATE;
    const PUBLIC = privacyOptions.PUBLIC;
    const SHARED = privacyOptions.SHARED;
    const [selectedChip, setSelectedChip] = React.useState(PRIVATE)

    const handleClick = (activeChip) => {
        setSelectedChip(activeChip);
        selectActiveChip(activeChip);
    };

    return (
        <div
            {...rest}
            className={clsx(classes.root, className)}
        >
            <div className={classes.row}>
                {/* <SearchInput
                    className={classes.searchInput}
                    placeholder="Search Document"
                    onChange={searchDocument}
                /> */}
                <span className={classes.spacer} />
                <Chip
                    className={classes.chip}
                    label="Not Shared"
                    onClick={() => handleClick(PRIVATE)}
                    variant={selectedChip == PRIVATE ? 'default' : 'outlined'}
                    color="primary"
                />
                <Chip
                    className={classes.chip}
                    label="Shared With Others"
                    onClick={() => handleClick(SHARED)}
                    variant={selectedChip == SHARED ? 'default' : 'outlined'}
                    color="primary"
                />
                <Chip
                    className={classes.chip}
                    label="Public"
                    onClick={() => handleClick(PUBLIC)}
                    variant={selectedChip == PUBLIC ? 'default' : 'outlined'}
                    color="primary"
                />
            </div>
        </div>
    );
};

DocumentListToolbar.propTypes = {
    className: PropTypes.string
};

export default DocumentListToolbar;
