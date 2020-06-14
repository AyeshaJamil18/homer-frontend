import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Radio,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper,
    Divider,
    Snackbar,
    RadioGroup,
    FormControlLabel
} from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SnackBarWrapper } from '../../../../components';

import { DocumentService, UserService, AccessGroupService } from 'service';
import { saveAs } from 'file-saver';

const useStyles = makeStyles(theme => ({
    root: {},
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
        marginRight: theme.spacing(2)
    },
    actions: {
        justifyContent: 'flex-end'
    },
    tableCell: {
        width: '70%'
    },
    userListPaper : {
        width: '45%',
        maxWidth: 250
    },
    textField : {
        marginBottom : theme.spacing(1)
    },
    spacer: {
        flexGrow: 1
    },
}));

const DocumentListTable = props => {
    const { className, activeDocumentList, activePrivacy, privacyOptions, shareFunction, ...rest } = props;

    const classes = useStyles();
    let history = useHistory();

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    const [selectedPrivacy, setSelectedPrivacy] = React.useState(privacyOptions.PRIVATE);
    const [sharedDocument, setSharedDocument] = React.useState({});
    const [userEmailList, setUserEmailList] = React.useState([]);
    const [userEmail, setUserEmail] = React.useState('');
    const [accessGroup, setAccessGroup] = React.useState({});
    const [addedUserList, setAddedUserList] = React.useState([]);
    const [deletedUserList, setDeletedUserList] = React.useState([]);
    const [isError, setIsError] = React.useState(false);
    const [helperText, setHelperText] = React.useState(null);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState('');
    const [variantValue, setVariantValue] = React.useState('success');


    const handleClickOpen = (document) => {
        setSharedDocument(document);
        if(activePrivacy === privacyOptions.SHARED) {
            AccessGroupService.getDocumentAccessGroup(document.id)
                .then(resp => resp.json())
                .then(data => {
                    if(data.accessGroups && data.accessGroups.length > 0) {
                        setAccessGroup(data.accessGroups[0]);
                        setUserEmailList(data.accessGroups[0].userIds)
                    }
                })
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAccessGroup({});
        setUserEmailList([]);
        setAddedUserList([]);
        setDeletedUserList([]);
        setUserEmail('');
        setSelectedPrivacy(activePrivacy);
        setIsError(false);
        setHelperText(null);
    };

    const handlePageChange = (event, myPage) => {
        setPage(myPage);
    };

    const handleRowsPerPageChange = event => {
        setPage(0);
        setRowsPerPage(event.target.value);
    };

    const handleRadioChange = (event) => {
        setSelectedPrivacy(event.target.value);
    };
    const handleChangeUserEmail = (event) => {
        setUserEmail(event.target.value);
        setIsError(false);
        setHelperText(null);
    }

    const handleCloseSnackBar = () => {
        setSnackBarMessage('');
        setOpenSnackBar(false);
        setVariantValue('success');
    };

    const handleOpenSnackBar = (variantValue, snackBarMessage) => {
        setSnackBarMessage(snackBarMessage);
        setVariantValue(variantValue);
        setOpenSnackBar(true);
    }

    const shareDocument = () => {
        let accessGroupObject;
        if(selectedPrivacy === activePrivacy) {
            if( selectedPrivacy !== privacyOptions.SHARED || !(addedUserList.length > 0 || deletedUserList.length > 0)) {
                return;
            }
            accessGroupObject = {
                accessGroup: { documentId : sharedDocument.id, modifier: 'r', userIds: userEmailList.map(u=>u.userId)},
                addedUsers: {userIds: addedUserList.map(u=>u.userId)},
                deletedUsers: {userIds: deletedUserList.map(u=>u.userId)}
            };
        }

        else if(selectedPrivacy === privacyOptions.SHARED) {
            accessGroupObject = {accessGroup: { documentId : sharedDocument.id, modifier: 'r', userIds: userEmailList.map(u=>u.userId)}};
        } 

        shareFunction(activePrivacy, selectedPrivacy, sharedDocument, accessGroupObject)
                .then(result => {
                    if(!result) {
                        // open snack bar error
                        console.log('something went wrong');
                        handleOpenSnackBar('error', 'Something went wrong while sharing document');
                        
                    } else {
                        handleOpenSnackBar('success', 'Document is successfully shared');
                        handleClose()
                    }
            })

    }

    useEffect(() => {
        setPage(0);
        setRowsPerPage(10);
        setSelectedPrivacy(activePrivacy);
    }, [activeDocumentList]);

    const setUserNotFoundError = () => {
        setIsError(true);
        setHelperText('User not found in the system')
    }

    const setUserExistAlreadyInListError = () => {
        setIsError(true);
        setHelperText('User is already exist in the list')
    }

    const setOwnerShouldNotBeInTheListError = () => {
        setIsError(true);
        setHelperText('Owner should not be in the list')
    }

    const userAddToShare = () => {
        console.log('user email ', userEmail);

        if(userEmailList.find(user => user.email === userEmail)) {
            setUserExistAlreadyInListError();
            return;
        }
        UserService.checkUserEmailExist(userEmail)
            .then(resp => resp.json())
            .then(data => {
                //TODO: check ownerId, share user email should not be owner email
                if(data.isExist) {
                    if(data.isRequester) {
                        setOwnerShouldNotBeInTheListError();
                        return;
                    }
                    userEmailList.push({email: data.email, userId: data.userId});
                    addedUserList.push({email: data.email, userId: data.userId});
                    console.log(userEmailList);
                    setUserEmail('');
                    handleOpenSnackBar('success', 'User added successfully');
                } else {
                    setUserNotFoundError();
                }
            })
            .catch((e) => {
                console.log(e);
                handleOpenSnackBar('error', 'Could not add user in the list')
            });
    }

    const redirectToEdit = (documentId) => {
        DocumentService.getDocumentById(documentId)
            .then(resp => resp.json())
            .then(data => {
                history.push({
                    pathname: '/editor',
                    state: {
                        columns: data.data.map(column => column.title),
                        columnsData: data.data,
                        fileName: data.originalFilename,
                        title: data.title,
                        id: data.id
                    }
                });
            }).catch((e) => {
                console.log(e);
                handleOpenSnackBar('error', 'Colud not redirect to Editor page')
            });
    }

    const startDownload = (documentId) => {
        DocumentService.downloadDocument(documentId)
            .then(resp => resp.json())
            .then(data => {
                var blob = new Blob([data.csvData], { type: 'text/csv' });
                saveAs(blob, data.fileName);
            }).catch((e) => {
                console.log(e);
                handleOpenSnackBar('error', 'Something went wrong on download')
        });
    };

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Name</TableCell>
                                    <TableCell className={classes.tableCell}>Privacy</TableCell>
                                    <TableCell align="right">Upload Date</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {activeDocumentList.slice((page * rowsPerPage), ((page + 1) * rowsPerPage)).map(document => (
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
                                                <Typography variant="body1">{activePrivacy}</Typography>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            {moment(document.createdAt).format('DD/MM/YYYY')}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                onClick={() => redirectToEdit(document.id)}
                                                color="primary"
                                                variant="outlined"
                                                className={classes.importButton}>
                                                Edit
                                            </Button>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                onClick={() => handleClickOpen(document)}
                                                color="primary"
                                                variant="outlined"
                                                className={classes.importButton}>
                                                Share
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
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Sharing</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To share this dataset({sharedDocument.title}) to another user or publicly, please select
                                    privacy setting.
                                </DialogContentText>
                                <Grid>
                                    <RadioGroup row aria-label="Privacy Options" name="privacyOptions" className={classes.nameContainer} value={selectedPrivacy} onChange={handleRadioChange}>
                                        <FormControlLabel value={privacyOptions.PRIVATE} control={<Radio />} label="Private" />
                                        <span className={classes.spacer}/>
                                        <FormControlLabel value={privacyOptions.SHARED} control={<Radio />} label="Share With Others" />
                                        <span className={classes.spacer}/>
                                        <FormControlLabel value={privacyOptions.PUBLIC} control={<Radio />} label="Public" />
                                    </RadioGroup>
                                    <span className={classes.spacer}/>
                                </Grid>
                                {selectedPrivacy == 'shared' && 
                                    <div>
                                        <Paper variant="outlined" square className={classes.userListPaper} style={{ height: 200, maxHeight: 200, overflow: 'auto'}}>
                                            <List >
                                                {userEmailList.map(email => (
                                                    <div key={`div-${email.userId}`}>
                                                        <ListItem key={email.userId}>
                                                            <ListItemText primary={email.email} />
                                                        </ListItem>
                                                        <Divider component="li" />
                                                    </div>
                                                ))}
                                            </List>
                                        </Paper>
                                        <Paper className={classes.userListPaper} style={{position: 'relative', top: -200, left: 265}}
                                            elevation={0}>
                                            <TextField
                                                className={classes.textField}
                                                error={isError}
                                                // fullWidth
                                                helperText={
                                                    isError ? helperText : null
                                                }
                                                label="Email Address"
                                                name="email"
                                                onChange={handleChangeUserEmail}
                                                type="text"
                                                value={userEmail}
                                                variant="outlined"
                                            />
                                            <Button variant="outlined" color="primary" onClick={userAddToShare}>
                                                Add User
                                            </Button>
                                            
                                        </Paper>

                                    </div>
                                }
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={shareDocument} color="primary">
                                    Share
                                </Button>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </PerfectScrollbar>
            </CardContent>
            <CardActions className={classes.actions}>
                <TablePagination
                    component="div"
                    count={activeDocumentList.length}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </CardActions>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={4000}
                onClose={handleCloseSnackBar}
                open={openSnackBar}
            >
                <SnackBarWrapper
                    message={snackBarMessage}
                    onClose={handleCloseSnackBar}
                    variant={variantValue}
                />
            </Snackbar>
        </Card>
    );
};

DocumentListTable.propTypes = {
    className: PropTypes.string
};

export default DocumentListTable;
