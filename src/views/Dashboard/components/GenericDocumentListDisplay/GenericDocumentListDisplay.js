import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import LoadingSpinner from 'react-loader-spinner';


const useStyles = makeStyles(theme => ({
    root: {},
    content: {
        padding: 0
    },
    inner: {
        minWidth: 200
    },
    statusContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    status: {
        marginRight: theme.spacing(1)
    },
    actions: {
        justifyContent: 'flex-end'
    }
}));

const GenericDocumentListDisplay = props => {
    const { className, promise, documentCount, tableRows, title, headerBackgroundColor, buttonLink, ...rest } = props;
    const classes = useStyles();

    const history = useHistory();

    const [DocumentList, setDocumentList] =
        React.useState(undefined);

    // simple counter for list entry keys
    let counter = 0;

    useEffect(() => {
        props.promise
            .then(data => {
                setDocumentList(data.slice(0, documentCount));
            })
            .catch(e => console.log(e));
    }, []);

    const handleButtonClick = () => {
        history.push({
            pathname: buttonLink
        });
    };

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardHeader style={{ backgroundColor: headerBackgroundColor, color: 'white' }}
                        title={title}
            />
            <Divider/>
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        {!DocumentList ? <LoadingSpinner type="ThreeDots" height={60}/> : (
                            <Table>
                                <TableHead>
                                    <TableRow
                                        key={'headerRow'}>
                                        {tableRows.map(row => (
                                            <TableCell
                                                key={row}
                                            >{row}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {DocumentList.map(doc => (
                                        <TableRow
                                            className={classes.tableRow}
                                            hover
                                            key={counter++}
                                        >{tableRows.map(row => (
                                            <TableCell
                                                className={classes.tableCell}
                                                key={counter++}
                                            >
                                                <div className={classes.nameContainer}>
                                                    {doc[row]}
                                                </div>
                                            </TableCell>
                                        ))}
                                        </TableRow>
                                    ))
                                    }
                                </TableBody>
                            </Table>
                        )}

                    </div>
                </PerfectScrollbar>
            </CardContent>
            <Divider/>
            <CardActions className={classes.actions}>
                <Button
                    color="primary"
                    size="small"
                    variant="text"
                    onClick={handleButtonClick}
                >
                    View all <ArrowRightIcon/>
                </Button>
            </CardActions>
        </Card>
    );
};

GenericDocumentListDisplay.propTypes = {
    className: PropTypes.string
};

export default GenericDocumentListDisplay;
