import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

import { DocumentService } from 'service';
import { saveAs } from 'file-saver';
import { useHistory } from 'react-router-dom';
import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
    root: {},
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2)
    },
    content: {
        padding: 0
    },
    inner: {
        minWidth: 1050
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: theme.spacing(1)
    },
    actions: {
        justifyContent: 'flex-end'
    },
    tableCell: {
        width: '70%'
    }
}));

const DocumentListTable = props => {
    const { className, ...rest } = props;

    const classes = useStyles();
    let history = useHistory();

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [sharedDocumentList, setSharedDocumentList] = React.useState([]);
    const [sharedDocumentListFilter, setSharedDocumentListFilter] = React.useState([]);
    const [searchKeyword, setSearchKeyword] = React.useState(null);

    const handlePageChange = (event, myPage) => {
        setPage(myPage);
    };

    const handleRowsPerPageChange = event => {
        setPage(0);
        setRowsPerPage(event.target.value);
    };

    useEffect(() => {
        DocumentService.getDocumentsSharedWithMe()
            .then(resp => resp.json())
            .then(data => {
                setSharedDocumentList(data.docs);
                setSharedDocumentListFilter(data.docs);
            }).catch((e) => {
            console.log(e);
        });
    }, []);

    const startDownload = (documentId) => {
        DocumentService.downloadDocument(documentId)
            .then(resp => resp.json())
            .then(data => {
                var blob = new Blob([data.csvData], { type: 'text/csv' });
                saveAs(blob, data.fileName);
            }).catch((e) => {
            console.log(e);
        });
    };

    const viewDocument = (documentId) => {
        history.push({
            pathname: "/document/"+documentId
        })
    }

    const searchDocument = (event) => {
        const tempKeyword = event.target.value;
        setSharedDocumentListFilter(sharedDocumentList.filter(doc => doc.title.includes(tempKeyword)));
        setSearchKeyword(tempKeyword);
    }

    return (
        <div {...rest}
            className={clsx(classes.root, className)}
        >
            <div className={classes.row}>
                    <SearchInput
                        className={classes.searchInput}
                        placeholder="Search Document"
                        onChange={searchDocument}
                    />
            </div>
            <Card>
                <CardContent className={classes.content}>
                    <PerfectScrollbar>
                        <div className={classes.inner}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.tableCell}>Name</TableCell>
                                        <TableCell className={classes.tableCell}>Owner</TableCell>
                                        <TableCell align="center">Upload Date</TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sharedDocumentListFilter.slice((page * rowsPerPage), ((page + 1) * rowsPerPage)).map(document => (
                                        <TableRow
                                            className={classes.tableRow}
                                            hover
                                            key={document.id}
                                        >
                                            <TableCell className={classes.tableCell}>
                                                <div className={classes.nameContainer}>
                                                    <Typography variant="body1">{document.title}</Typography>
                                                </div>
                                            </TableCell>
                                            <TableCell className={classes.tableCell}>
                                                <div className={classes.nameContainer}>
                                                    <Avatar className={classes.avatar}><PersonIcon /></Avatar>
                                                    <Typography variant="body1">{document.username}</Typography>
                                                </div>
                                            </TableCell>
                                            <TableCell align="center">
                                                {moment(document.createdAt).format('DD/MM/YYYY')}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    onClick={() => viewDocument(document.id)}
                                                    color="primary"
                                                    variant="outlined"
                                                    className={classes.importButton}>
                                                    View
                                                </Button>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    onClick={() => startDownload(document.id)}
                                                    color="primary"
                                                    variant="outlined"
                                                    className={classes.importButton}>
                                                    Download
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </PerfectScrollbar>
                </CardContent>
                <CardActions className={classes.actions}>
                    <TablePagination
                        component="div"
                        count={sharedDocumentListFilter.length}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handleRowsPerPageChange}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                </CardActions>
            </Card>
        </div>
    );
};

DocumentListTable.propTypes = {
    className: PropTypes.string
};

export default DocumentListTable;
