import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import AnonymizationAssignment from 'service/Anonymization/AnonymizationAssignment';
import AnonymizationWorkerService from 'service/Anonymization/AnonymizationWorkerService';
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Radio,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Chip,
    TablePagination

} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { DocumentService } from 'service';

import { SnackBarWrapper } from 'components';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import validate from 'validate.js';


const anonymizationWorker = new AnonymizationWorkerService();

const schema = {
    fileName: {
        presence: { allowEmpty: false, message: 'is required' },
        format: {
            pattern: '^[a-zA-Z0-9-.@_]*$',
            flags: 'i',
            message: 'can only contain English Alphabets, Numbers from 0-9 and speical characters .@-_'
        }
    }
};

const printStatement= [];

const useStyles = makeStyles(theme => ({
    root: {},
    content: {
        padding: 0,
    },
    inner: {
        minWidth: 1050,
        // WebkitTransform: 'rotateX(180deg)'
    },
    scrollBar: {
        // WebkitTransform: 'rotateX(180deg)'
    },
    fixStyle: {
        // float: 'left'
        display: 'flex',
    },
    buttonNormal: {
        backgroundColor: "white"
    },
    buttonSelected: {
        backgroundColor: "Green"
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
    tableRow: {
        border: 'none'
    },
    tableCell: {
        borderRight: 'solid 1px lightgrey',
        borderLeft: 'solid 1px lightgrey',
        borderBottom: 'none',
        //   border-right: solid 1px #f00;
        // border-left: solid 1px #f00;
    },
    tableCell_header: {
        borderRight: 'solid 1px lightgrey',
        borderLeft: 'solid 1px lightgrey',
        borderBottom: 'none',

        //   border-right: solid 1px #f00;
        // border-left: solid 1px #f00;
    },
    tableHead: {
        backgroundColor: '#f0f0f0'
    },
    table: {
        borderCollapse: 'collapse'
    },
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3)
    },
    spacer: {
        flexGrow: 1
    },
    button: {
        backgroundColor: 'var(--backgroundColor)',
    },
    MaskingClass: {
        color: 'black',
        backgroundColor: '#f4e9af',
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    HashingClass: {
        color: 'black',
        backgroundColor: '#D0F3AD',
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    HashingWithSaltClass: {
        color: 'black',
        backgroundColor: '#CCEDF4',
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    RandomClass: {
        color: 'black',
        backgroundColor: '#EC9C88',
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    GeneralizationClass: {
        color: 'black',
        backgroundColor: '#CAC7EE',
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
    },
    DeleteClass: {
        color: 'black',
        backgroundColor: '#E1C3D9',
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    DialogClass: {

        color:'red'
    },
    TheInput: {
        padding: 10,
        fontSize: 12,
        labelFontSize: 40
    }
}));

const Default = {
    '--backgroundColor': 'white',
};
const MaskingStyle = {
    '--backgroundColor': '#f4e9af',
};
const HashingStyle = {
    '--backgroundColor': '#D0F3AD',
};
const HashingWithSaltStyle= {
     '--backgroundColor': '#CCEDF4'
};
const RandomStyle= {
     '--backgroundColor': '#EC9C88'
};
const GeneralizationStyle= {
     '--backgroundColor': '#CAC7EE'
};
const DeleteStyle= {
     '--backgroundColor': '#E1C3D9'
};

const DocumentViewTable = props => {

    const { className, ...rest } = props;
    let location = useLocation();
    let history = useHistory();
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [fileNameFormState, setFileNameFormState] = useState({
        isValid: true,
        value: {},
        touched: false,
        error: {}
    });
    
    let [anonymizationAssignmentsObject] = React.useState({});
    
    const [documentId, setDocumentId] = useState(0);
    const [document, setDocument] = useState({
        id: null,
        title: '',
        originalFilename: '',
        data : []
    })
    const [documentRowLengthArray, setDocumentRowLengthArray] = useState([]);
    const handlePageChange = (event, myPage) => {
        setPage(myPage);
    };

    const handleRowsPerPageChange = event => {
        setPage(0);
        setRowsPerPage(event.target.value);
    };

    let { id } = useParams();
    useEffect(() => {
        if(!id) {
            history.push({
                pathname: "/not-found"
            })
        } else {
            DocumentService.getDocumentById(id)
                .then(resp => resp.status === 404 ? Promise.reject(resp) : resp.json())
                .then(data => {
                    setDocument(data);
                    setDocumentRowLengthArray(Array.from(Array(data.data[0].data.length).keys())) // get first column data length as a document length
                }).catch((e) => {
                    history.push({
                        pathane: "/not-found"
                    })
                });
        }
    }, []);


    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >

                <TextField
                    //className={classes.TheInput}
                    // labelFontSize={40}
                    label="FileName"
                    name = "fileName"
                    placeholder = "Enter FileName"
                    value={document.title || ''}
                    InputProps={{
                        readOnly: true,
                      }}
                />
                <CardContent className={classes.content}>
                    <PerfectScrollbar >
                        <div className={classes.inner} >
                            <Table className={classes.table}>
                                <TableHead className={classes.tableHead}>

                                    <TableRow className={classes.tableRow}>
                                        {document.data.map(column => (
                                            <TableCell
                                                className={classes.tableCell_header}
                                                key={column.orderPosition}
                                            >
                                                <div>
                                                    <Button
                                                        className={classes.button}
                                                        disabled
                                                        // style={anonymizationAssignmentsObject[column.orderPosition] ? anonymizationAssignmentsObject[column.orderPosition].color : Default}
                                                        aria-controls="simple-menu"
                                                        aria-haspopup="true"
                                                        variant="outlined"
                                                    >
                                                        {column.title}
                                                        <ArrowDropDownIcon/>
                                                    </Button>

                                                </div>
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                </TableHead>
                                <TableBody>
                                    {documentRowLengthArray.slice((page * rowsPerPage), ((page + 1) * rowsPerPage)).map(index => (
                                        <TableRow
                                            className={classes.tableRow}
                                            key={index}
                                            // selected={selectedUsers.indexOf(user.id) !== -1}
                                        >
                                            {document.data.map(column => (
                                                <TableCell
                                                    className={classes.tableCell}
                                                    key={column.orderPosition}
                                                >
                                                    {column.data[index]}
                                                </TableCell>
                                            ))}
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
                        count={documentRowLengthArray.length}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handleRowsPerPageChange}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                </CardActions>
            </Card>
    );
};

DocumentViewTable.propTypes = {
    className: PropTypes.string
};

export default DocumentViewTable;
