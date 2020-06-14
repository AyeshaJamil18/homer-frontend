import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useHistory, useLocation } from 'react-router-dom';
import AnonymizationAssignment from 'service/Anonymization/AnonymizationAssignment';
import AnonymizationWorkerService from 'service/Anonymization/AnonymizationWorkerService';
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
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
    Typography,

} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { DocumentService } from 'service';
import { CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';

import { SnackBarWrapper } from 'components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

import AnonymizationFactoryService from '../../../../service/Anonymization/AnonymizationFactoryService';
import validate from 'validate.js';
import DexieService from '../../../../service/DexieService';
import Overlay from '../../../Overlay';

const anonymizationWorker = new AnonymizationWorkerService();
const printStatement = [];

const schema = {
    fileName: {
        presence: { allowEmpty: false, message: 'is required' },
        format: {
            pattern: '^[a-zA-Z0-9-.@_]*$',
            flags: 'i',
            message: 'can only contain English Alphabets, Numbers from 0-9 and special characters .@-_'
        }
    }
};

const useStyles = makeStyles(theme => ({
    root: {},
    content: {
        padding: 0
    },
    title: {
        //   fontWeight: 700,
        fontSize: 33
    },
    inner: {
        minWidth: 1050
    },
    fixStyle: {
        display: 'flex'
    },
    buttonNormal: {
        backgroundColor: 'white'
    },
    buttonSelected: {
        backgroundColor: 'Green'
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
        borderBottom: 'none'
    },
    tableCell_header: {
        borderRight: 'solid 1px lightgrey',
        borderLeft: 'solid 1px lightgrey',
        borderBottom: 'none'

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
        backgroundColor: 'var(--backgroundColor)'
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
        marginTop: theme.spacing(1)
    },
    DeleteClass: {
        color: 'black',
        backgroundColor: '#E1C3D9',
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    DialogClass: {
        color: 'red',
        textAlign: 'center',
        left: '50%'
    },
    TheInput: {
        padding: 10,
        fontSize: 12,
        labelFontSize: 40
    },
    card: {
        marginTop: theme.spacing(1),
        top_padding: 10,
        maxWidth: 550
    },
    yt_description: {
        fontSize: 18,
        color: 'textPrimary',
        lineHeight: 2
    },
    yt_h2: {
        fontSize: 18,
        color: 'textPrimary',
        lineHeight: 2
    },
    yt_h3: {
        fontsize: 16,
        variant: 'body1',
        component: 'p',
        lineHeight: 1.6
    }
}));


const Default = {
    '--backgroundColor': 'white'
};
const MaskingStyle = {
    '--backgroundColor': '#f4e9af'
};
const HashingStyle = {
    '--backgroundColor': '#D0F3AD'
};
const HashingWithSaltStyle = {
    '--backgroundColor': '#CCEDF4'
};
const RandomStyle = {
    '--backgroundColor': '#EC9C88'
};
const GeneralizationStyle = {
    '--backgroundColor': '#CAC7EE'
};
const DeleteStyle = {
    '--backgroundColor': '#E1C3D9'
};

const EditorTable = props => {

    const { className, ...rest } = props;
    let location = useLocation();
    let history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [OpenConfirmation, setOpenConfirmation] = React.useState(false);
    const [OpenYoutubeChipMasking, setOpenYoutubeChipMasking] = React.useState(false);
    const [OpenYoutubeChipHashing, setOpenYoutubeChipHashing] = React.useState(false);
    const [OpenYoutubeChipHashingWithSalt, setOpenYoutubeChipHashingWithSalt] = React.useState(false);
    const [OpenYoutubeChipRandom, setOpenYoutubeChipRandom] = React.useState(false);
    const [OpenYoutubeChipGeneralization, setOpenYoutubeChipGeneralization] = React.useState(false);
    const [OpenYoutubeChipDelete, setOpenYoutubeChipDelete] = React.useState(false);
    const [SaveButtonDisable, setSaveButtonDisable] = React.useState(false);
    const [SaveButtonLoader, setSaveButtonLoader] = React.useState(false);
    const classes = useStyles();

    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [openErrorSpecial, setOpenErrorSpecial] = React.useState(false);
    const [openMaskRangeError, setMaskRangeError] = React.useState(false);
    const [openGenStepError, setGenStepError] = React.useState(false);
    const [openMaskDecimalError, setMaskDecimalError] = React.useState(false);
    const [openErrorEmptyString, setErrorEmptyString] = React.useState(false);
    const [openErrorIncomInput, setErrorIncomInput] = React.useState(false);

    const [selectedValueGenStep, setSelectedValueGenStep] = React.useState('');

    const [selectedValueMaskPat, setSelectedValueMaskPat] = React.useState('');
    const [selectedValueMaskRange, setSelectedValueMaskRange] = React.useState('');

    const [selectedValue, setSelectedValue] = React.useState('');
    const [selectedValue_Start, setSelectedValue_Start] = React.useState('');
    const [selectedValue_Cipher, setSelectedValue_Cipher] = React.useState('');
    const [workingColumn, setWorkingColumn] = React.useState(null);
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
        data: []
    });

    const handleRadioChangeGenStep = (event) => {
        const parsedValue = Number.parseInt(event.target.value);

        if (Number.isNaN(parsedValue)) {
            setSelectedValueGenStep(event.target.value);
        } else if (event.target.value < 1) {
            handleClickSnackBar('GenStepError');
        } else {
            setSelectedValueGenStep(event.target.value);
        }

    };
    const handleRadioChangeMaskPat = (event) => {
        setSelectedValueMaskPat(event.target.value);
    };

    const handleRadioChangeMaskRange = (event) => {
        const parsedValue = Number.parseInt(event.target.value);

        if (Number.isNaN(parsedValue)) {
            setSelectedValueMaskRange(event.target.value);
        } else if (parsedValue.toString() !== event.target.value) {
            handleClickSnackBar('MaskingDecimalError');
        } else if (event.target.value < 1) {
            handleClickSnackBar('MaskingRangeError');
        } else {
            setSelectedValueMaskRange(event.target.value);
        }
    };

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleRadioChange_Cipher = (event) => {
        setSelectedValue_Cipher(event.target.value);
    };
    const handleRadioChange_Start = (event) => {
        setSelectedValue_Start(event.target.value);
    };


    const handleClickOpen = (position) => {
        console.log('position' + position);
        setWorkingColumn(position);
        if (anonymizationAssignmentsObject[position]) {
            let anonymization = anonymizationAssignmentsObject[position];
            setSelectedValue(anonymization.selectedValue);
            if (anonymization.selectedValue === 'Masking') {
                setSelectedValue_Start(anonymization.options.start);
                setSelectedValueMaskPat(anonymization.options.pattern);
                setSelectedValueMaskRange(anonymization.options.range);
            } else if (anonymization.selectedValue === 'Hashing') {
                setSelectedValue_Cipher(anonymization.options.Cipher);
            } else if (anonymization.selectedValue === 'HashingWithSalt') {
                setSelectedValue_Cipher(anonymization.options.Cipher);
            } else if (anonymization.selectedValue === 'Random') {

            } else if (anonymization.selectedValue === 'Generalization') {
                setSelectedValueGenStep(anonymization.options.stepSize);
            } else if (anonymization.selectedValue === 'DeletetheColumn') {
            }
        } else {
            setSelectedValue('None');
        }
        setOpen(true);
    };

    const handleClickChipMasking = () => {
        setOpenYoutubeChipMasking(true);
    };

    const handleClickChipCloseMasking = () => {
        setOpenYoutubeChipMasking(false);
    };


    const handleClickChipHashing = () => {
        setOpenYoutubeChipHashing(true);
    };

    const handleClickChipCloseHashing = () => {
        setOpenYoutubeChipHashing(false);
    };

    const handleClickChipHashingWithSalt = () => {
        setOpenYoutubeChipHashingWithSalt(true);
    };

    const handleClickChipCloseHashingWithSalt = () => {
        setOpenYoutubeChipHashingWithSalt(false);
    };

    const handleClickChipRandom = () => {
        setOpenYoutubeChipRandom(true);
    };

    const handleClickChipCloseRandom = () => {
        setOpenYoutubeChipRandom(false);
    };

    const handleClickChipGeneralization = () => {
        setOpenYoutubeChipGeneralization(true);
    };

    const handleClickChipCloseGeneralization = () => {
        setOpenYoutubeChipGeneralization(false);
    };

    const handleClickChipDelete = () => {
        setOpenYoutubeChipDelete(true);
    };

    const handleClickChipCloseDelete = () => {
        setOpenYoutubeChipDelete(false);
    };
    const handleClose = () => {
        setSelectedValueMaskPat('');
        setSelectedValueMaskRange('');
        setSelectedValueGenStep('');
        setSelectedValue_Start('');
        setOpen(false);
    };
    const handleClickOpenConfirmation = () => {

        printStatement.length = 0;
        Object.keys(anonymizationAssignmentsObject).forEach(position => {
                printStatement.push(document.data[position].title + ' ----> ' +
                    AnonymizationFactoryService.getServiceForName(anonymizationAssignmentsObject[position].type)
                        .getDescription(anonymizationAssignmentsObject[position].options)
                );
            }
        );
        setOpenConfirmation(true);
    };
    const handleCloseConfirmation = () => {

        setOpenConfirmation(false);
    };
    useEffect(() => {
        console.log('refreshing');
        const error = validate(fileNameFormState.value, schema);

        setFileNameFormState(myFileNameFormState => ({
            ...myFileNameFormState,
            isValid: error ? false : true,
            error: error || {}
        }));
    }, [fileNameFormState.value]);

    const setDocumentData = (id, title, fileName, data) => {
        let trimmedFileName = title ? title : fileName ? fileName.slice(0, -4) : '';
        setFileNameFormState(myFileNameFormState => ({
            ...myFileNameFormState,
            value: { fileName: trimmedFileName }
        }));

        setDocumentId(id);
        setDocument({
            id: id,
            title: trimmedFileName,
            originalFilename: fileName,
            // dexie arrays do not contain map function. Repackage
            data: data
        });
    };

    useEffect(() => {
        console.log('checking location state', location.state);
        if (!location.state) {
            history.push({
                pathname: '/dashboard'
            });
        } else if (location.state.dexieDocumentId) {
            DexieService.getDocumentById(location.state.dexieDocumentId)
                .then(dexieDocument => dexieDocument.payload)
                .then(payload => {
                    setDocumentData(payload.id, payload.title, payload.fileName, payload.data);
                })
                .catch(e => {
                    console.log(e);

                    history.push({
                        pathname: '/myDocuments'
                    });
                });
        } else {
            /*
            Leaving this here in case setDocumentData does not work
            let trimmedFileName = location.state.title ? location.state.title : location.state.fileName ? location.state.fileName.slice(0, -4) : '';
            setFileNameFormState(fileNameFormState => ({
                ...fileNameFormState,
                value: { fileName: trimmedFileName }
            }));
            setDocumentId(location.state.id);
            setDocument({
                id: location.state.id,
                title: trimmedFileName,
                originalFilename: location.state.fileName,
                data: location.state.columnsData
            });*/

            setDocumentData(location.state.id,
                location.state.title,
                location.state.fileName,
                location.state.columnsData);
        }
    }, [location.state.dexieDocumentId]);

    const ApplyAnonymization = () => {
        const tempArray = [];
        Object.keys(anonymizationAssignmentsObject).forEach(position => {
            let assignmentProperties = anonymizationAssignmentsObject[position];
            const anonymizationAssignment = new AnonymizationAssignment(assignmentProperties.type, assignmentProperties.options, parseInt(position));
            tempArray.push(anonymizationAssignment);
            delete anonymizationAssignmentsObject[position];
        });
        anonymizationWorker.process(tempArray, document);

        const dexieObject = {
            id: documentId,
            data: document.data,
            fileName: document.originalFilename
        };

        DexieService.addDocument(dexieObject)
            .then(dexieId => history.push({
                pathname: '/editor',
                state: {
                    dexieDocumentId: dexieId
                }
            }));


        setOpenConfirmation(false);
        setSaveButtonDisable(true);
    };

    const saveAnnonymizationType = () => {
        let options = {};
        let type = '';
        let color;
        if (selectedValue === 'None') {
            if (anonymizationAssignmentsObject[workingColumn]) {
                delete anonymizationAssignmentsObject[workingColumn];
            }
            handleClose();
            return;
        }
        if (selectedValue === 'Masking') {
            if (selectedValue_Start === '' || selectedValueMaskPat === '' || selectedValueMaskRange === '') {
                handleClickSnackBar('InputError');
            } else {
                options = { start: selectedValue_Start, pattern: selectedValueMaskPat, range: selectedValueMaskRange };
                type = 'mask';
                color = MaskingStyle;
                handleClose();
                console.log(Object.keys(anonymizationAssignmentsObject).length);
                setSaveButtonDisable(false);
                anonymizationAssignmentsObject[workingColumn] = {
                    options: options,
                    type: type,
                    selectedValue: selectedValue,
                    color: color
                };

            }
        } else if (selectedValue === 'Hashing') {
            if (selectedValue_Cipher === '') {
                handleClickSnackBar('InputError');
            } else {
                options = { Cipher: setSelectedValue_Cipher, salt: false };
                type = 'hash';
                color = HashingStyle;
                handleClose();
                console.log(Object.keys(anonymizationAssignmentsObject).length);
                setSaveButtonDisable(false);
                anonymizationAssignmentsObject[workingColumn] = {
                    options: options,
                    type: type,
                    selectedValue: selectedValue,
                    color: color
                };
            }

        } else if (selectedValue === 'HashingWithSalt') {
            if (selectedValue_Cipher === '') {
                handleClickSnackBar('InputError');
            } else {
                options = { Cipher: setSelectedValue_Cipher, salt: true };
                type = 'hash';
                color = HashingWithSaltStyle;
                handleClose();
                console.log(Object.keys(anonymizationAssignmentsObject).length);
                setSaveButtonDisable(false);
                anonymizationAssignmentsObject[workingColumn] = {
                    options: options,
                    type: type,
                    selectedValue: selectedValue,
                    color: color
                };
            }

        } else if (selectedValue === 'Random Sort') {
            options = {};
            type = 'random';
            color = RandomStyle;
            handleClose();
            console.log(Object.keys(anonymizationAssignmentsObject).length);
            setSaveButtonDisable(false);
            anonymizationAssignmentsObject[workingColumn] = {
                options: options,
                type: type,
                selectedValue: selectedValue,
                color: color
            };
        } else if (selectedValue === 'Generalization') {
            if (selectedValueGenStep === '') {
                handleClickSnackBar('InputError');
            } else {
                options = { stepSize: selectedValueGenStep };
                type = 'generalization';
                color = GeneralizationStyle;
                handleClose();
                console.log(Object.keys(anonymizationAssignmentsObject).length);
                setSaveButtonDisable(false);
                anonymizationAssignmentsObject[workingColumn] = {
                    options: options,
                    type: type,
                    selectedValue: selectedValue,
                    color: color
                };
            }
        } else if (selectedValue === 'DeletetheColumn') {
            options = {};
            type = 'delete';
            color = DeleteStyle;
            handleClose();
            console.log(Object.keys(anonymizationAssignmentsObject).length);
            setSaveButtonDisable(false);
            anonymizationAssignmentsObject[workingColumn] = {
                options: options,
                type: type,
                selectedValue: selectedValue,
                color: color
            };
        }


    };

    const handleClickSnackBar = (type) => {
        if (type === 'success') {
            setOpenSuccess(true);
        } else if (type === 'error') {
            setOpenError(true);
        } else if (type === 'errorSpecial') {
            setOpenErrorSpecial(true);
        } else if (type === 'errorEmptyString') {
            setErrorEmptyString(true);
        } else if (type === 'MaskingRangeError') {
            setMaskRangeError(true);
        } else if (type === 'MaskingDecimalError') {
            setMaskDecimalError(true);
        } else if (type === 'GenStepError') {
            setGenStepError(true);
        } else if (type === 'InputError') {
            setErrorIncomInput(true);
        }

        setSaveButtonLoader(false);
    };

    const handleCloseSnackBar = (type) => {
        if (type === 'success') {
            setOpenSuccess(false);
        } else if (type === 'error') {
            setOpenError(false);
        } else if (type === 'errorSpecial') {
            setOpenErrorSpecial(false);
        } else if (type === 'errorEmptyString') {
            setErrorEmptyString(false);
        } else if (type === 'MaskingRangeError') {
            setMaskRangeError(false);
        } else if (type === 'MaskingDecimalError') {
            setMaskDecimalError(false);
        } else if (type === 'GenStepError') {
            setGenStepError(false);
        } else if (type === 'InputError') {
            setErrorIncomInput(false);
        }

    };
    const changeFileName = (event) => {
        event.persist();

        setFileNameFormState(myFileNameFormState => ({
            ...myFileNameFormState,
            value: { fileName: event.target.value },
            touched: true
        }));
        // FileName = event.target.value;
    };

    const hasError = field =>
        !!fileNameFormState.error[field];

    const isFileNameExist = (documents, fileName, myDocumentId) => {
        return documents.filter(doc => doc.id !== myDocumentId && doc.title === fileName).length > 0;
    };

    const updateDataset = () => {
        console.log('update clicked ', documentId);
        document.title = fileNameFormState.value.fileName;
        DocumentService.getDocument()
            .then(resp => resp.json())
            .then(data => {
                if (!isFileNameExist(data.docs, document.title, document.id)) {
                    DocumentService.updateDocument(document)
                        .then(resp => resp.json())
                        .then(() => {
                            handleClickSnackBar('success');
                            //console.log('updated ', location.state);
                        }).catch((e) => {
                        handleClickSnackBar('error');
                        console.log('error');
                        console.log(e);
                    });
                } else {
                    handleClickSnackBar('error');
                    console.log('error due to duplicate File name');
                }

            })
            .catch((e) => {
                console.log(e);
            });
    };

    const saveDataset = () => {
        document.title = fileNameFormState.value.fileName;

        setSaveButtonLoader(true);

        DocumentService.getDocument()
            .then(resp => resp.json())
            .then(data => {
                // let documentsFound = 0;
                // data.docs.forEach(item => {
                //     if (document.title === item.title) {
                //         documentsFound = documentsFound + 1;
                //         //break;
                //     }
                    // });

                    if (!isFileNameExist(data.docs, document.title)) {
                        if (/^[a-zA-Z0-9-.@_]*$/.test(document.title) === false) {
                            handleClickSnackBar('errorSpecial');
                        } else {
                            DocumentService.createDocument(document)
                                .then(resp => resp.json())
                                .then(myData => {
                                    handleClickSnackBar('success');
                                    console.log('Saved');
                                    console.log(JSON.stringify(myData));
                                    setDocumentId(myData.id);
                                    setDocument(myDocument => ({
                                        ...myDocument,
                                        id: myData.id
                                    }));
                                    location.state.id = myData.id;

                                    setTimeout(() => {
                                        history.push({
                                            pathname: '/myDocuments'
                                        });

                                        // On leaving editor, flush db
                                        DexieService.flushDocumentDb();
                                    }, 2500);
                                }).catch((e) => {
                                handleClickSnackBar('error');
                                console.log('error');
                                console.log(e);
                            });
                        }
                    } else {
                        handleClickSnackBar('error');
                        console.log('error due to duplicate File name');
                    }
                }
            ).catch((e) => {
            console.log(e);
        });
    };

    return (
        <div
            {...rest}
            className={clsx(classes.root, className)}

        >
            <div className={classes.fixStyle}>


                <div>
                    <Chip
                        className={classes.MaskingClass}
                        label="Masking 	🛈 "
                        onClick={handleClickChipMasking}
                        variant="outlined"
                    />
                    <Chip
                        className={classes.HashingClass}
                        label="Hashing	🛈"
                        onClick={handleClickChipHashing}
                        variant="outlined"
                    />
                    <Chip
                        className={classes.HashingWithSaltClass}
                        label="Hashing with Salt	🛈"
                        onClick={handleClickChipHashingWithSalt}
                        variant="outlined"
                    />
                    <Chip
                        className={classes.RandomClass}
                        label="Random Sort 🛈"
                        onClick={handleClickChipRandom}
                        variant="outlined"
                    />
                    <Chip
                        className={classes.GeneralizationClass}
                        label="Generalization	🛈"
                        onClick={handleClickChipGeneralization}
                        variant="outlined"
                    />
                    <Chip
                        className={classes.DeleteClass}
                        label="Delete	🛈"
                        onClick={handleClickChipDelete}
                        variant="outlined"
                    />
                    <Dialog
                        aria-labelledby="form-dialog-title"
                        className={classes.DialogClass}
                        onClose={handleClickChipCloseMasking}
                        open={OpenYoutubeChipMasking}
                    >
                        <DialogContent>
                            <Card className={classes.card}>
                                <CardBody>
                                    <iframe
                                        src='https://www.youtube.com/embed/9RjN9J24v4U'
                                        width='550px'
                                        height='315px'
                                        allowFullScreen
                                    />
                                    <CardContent>
                                        <Typography className={classes.yt_description}>
                                            Replace cell partially with a provided pattern
                                        </Typography>
                                        <Divider/>
                                        <Typography className={classes.yt_h2}>
                                            Pros:
                                        </Typography>
                                        <Typography className={classes.yt_h3}>
                                            - Part of cell is still available. Grouping by content often possible.
                                        </Typography>
                                        <Typography className={classes.yt_h2}>
                                            Cons:
                                        </Typography>
                                        <Typography className={classes.yt_h3}>
                                            - Too small masks will leak data <br/>
                                            - Input with variable size is either fully masked or not masked enough.
                                        </Typography>
                                    </CardContent>
                                </CardBody>
                            </Card>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                color="primary"
                                onClick={handleClickChipCloseMasking}
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        aria-labelledby="form-dialog-title"
                        className={classes.DialogClass}
                        onClose={handleClickChipCloseHashing}
                        open={OpenYoutubeChipHashing}
                        styles={{ background: '#D3D3D3' }}
                    >
                        <DialogContent>
                            <Card className={classes.card}>
                                <CardBody>
                                    <iframe
                                        src='https://www.youtube.com/embed/-DeMO7nKr3A'
                                        width='550px'
                                        height='315px'
                                        allowFullScreen
                                    />
                                    <CardContent>
                                        <Typography className={classes.yt_description}>
                                            Maps an input to a fixed size output. The same input will always result in
                                            the same output. Even small changes in the input will result in significant
                                            changes in the output.
                                            The resulting hash can be described as a footprint of the original input.
                                        </Typography>
                                        <Divider/>
                                        <Typography className={classes.yt_h2}>
                                            Pros:
                                        </Typography>
                                        <Typography className={classes.yt_h3}>
                                            - Original values no longer visible <br/>
                                            - If same hash function is used, data can be matched with other anonymized
                                            documents (same input cell -> same output cell)
                                        </Typography>
                                        <Typography className={classes.yt_h2}>
                                            Cons:
                                        </Typography>
                                        <Typography className={classes.yt_h3}>
                                            - If input variance is low (e.g. numbers from 0 to 100) values can easily be
                                            brutforced and matched against the existing hashes. -> Data leak
                                            possible <br/>
                                            - Can increase cell size if input is small enough
                                        </Typography>
                                    </CardContent>
                                </CardBody>
                            </Card>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                color="primary"
                                onClick={handleClickChipCloseHashing}
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        aria-labelledby="form-dialog-title"
                        className={classes.DialogClass}
                        onClose={handleClickChipCloseHashingWithSalt}
                        open={OpenYoutubeChipHashingWithSalt}
                        styles={{ background: '#D3D3D3' }}
                    >
                        <DialogContent>
                            <Card className={classes.card}>
                                <CardBody>
                                    <iframe
                                        src='https://www.youtube.com/embed/o1YSaxvCw8g'
                                        width='550px'
                                        height='315px'
                                        allowFullScreen
                                    />
                                    <CardContent>
                                        <Typography className={classes.yt_description}>
                                            Same as hashing, but a random salt will be feed to the hashing function in
                                            addition to the cell content.
                                            Salt is not saved.
                                        </Typography>
                                        <Divider/>
                                        <Typography className={classes.yt_h2}>
                                            Pros:
                                        </Typography>
                                        <Typography className={classes.yt_h3}>
                                            - Original values no longer visible <br/>
                                            - Makes brutforcing values very hard if not impossible
                                        </Typography>
                                        <Typography className={classes.yt_h2}>
                                            Cons:
                                        </Typography>
                                        <Typography className={classes.yt_h3}>
                                            - Hashes can no longer be matched against other documents or other columns.
                                            Only in the same column the same input will produce the same output <br/>
                                            - Can increase cell size if input is small enough
                                        </Typography>
                                    </CardContent>
                                </CardBody>
                            </Card>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                color="primary"
                                onClick={handleClickChipCloseHashingWithSalt}
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        aria-labelledby="form-dialog-title"
                        className={classes.DialogClass}
                        onClose={handleClickChipCloseRandom}
                        open={OpenYoutubeChipRandom}
                        styles={{ background: '#D3D3D3' }}
                    >
                        <DialogContent>
                            <Card className={classes.card}>
                                <CardBody>
                                    <iframe
                                        src='https://www.youtube.com/embed/W2070jpbpSk'
                                        width='550px'
                                        height='315px'
                                        allowFullScreen
                                    />
                                    <CardContent>
                                        <Typography className={classes.yt_description}>
                                            Sorting the cells randomly in a column.
                                        </Typography>
                                        <Divider/>
                                        <Typography className={classes.yt_h2}>
                                            Pros:
                                        </Typography>
                                        <Typography className={classes.yt_h3}>
                                            - Data looses its association with other values in the original row <br/>
                                            - Data distribution analysis still possible
                                        </Typography>
                                        <Typography className={classes.yt_h2}>
                                            Cons:
                                        </Typography>
                                        <Typography className={classes.yt_h3}>
                                            - Original values are still present
                                        </Typography>
                                    </CardContent>
                                </CardBody>
                            </Card>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                color="primary"
                                onClick={handleClickChipCloseRandom}
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        aria-labelledby="form-dialog-title"
                        className={classes.DialogClass}
                        onClose={handleClickChipCloseGeneralization}
                        open={OpenYoutubeChipGeneralization}
                        styles={{ background: '#D3D3D3' }}
                    >
                        <DialogContent>
                            <Card className={classes.card}>
                                <CardBody>
                                    <iframe
                                        src='https://www.youtube.com/embed/YaOdtuBwYB4'
                                        width='550px'
                                        height='315px'
                                        allowFullScreen
                                    />
                                    <CardContent>
                                        <Typography className={classes.yt_description}>
                                            In generalization data can be grouped up into buckets. <br/>
                                            Only works on numbers.
                                        </Typography>
                                        <Divider/>
                                        <Typography className={classes.yt_h2}>
                                            Pros:
                                        </Typography>
                                        <Typography className={classes.yt_h3}>
                                            - The general direction of the data implications remain intact
                                        </Typography>
                                        <Typography className={classes.yt_h2}>
                                            Cons:
                                        </Typography>
                                        <Typography className={classes.yt_h3}>
                                            - Accurate values are no longer available
                                        </Typography>
                                    </CardContent>
                                </CardBody>
                            </Card>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                color="primary"
                                onClick={handleClickChipCloseGeneralization}
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        aria-labelledby="form-dialog-title"
                        className={classes.DialogClass}
                        onClose={handleClickChipCloseDelete}
                        open={OpenYoutubeChipDelete}
                    >
                        <DialogContent>
                            <Card className={classes.card}>
                                <CardBody>
                                    <iframe
                                        src='https://www.youtube.com/embed/WQAbRZKLJ4A'
                                        width='550px'
                                        height='315px'
                                        allowFullScreen
                                    />
                                    <CardContent>
                                        <Typography className={classes.yt_description}>
                                            Remove the column from the dataset completely.
                                        </Typography>
                                        <Divider/>
                                        <Typography className={classes.yt_h2}>
                                            Pros:
                                        </Typography>
                                        <Typography className={classes.yt_h3}>
                                            - Most secure anonymization technique
                                        </Typography>
                                        <Typography className={classes.yt_h2}>
                                            Cons:
                                        </Typography>
                                        <Typography className={classes.yt_h3}>
                                            - No information
                                        </Typography>
                                    </CardContent>
                                </CardBody>
                            </Card>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                color="primary"
                                onClick={handleClickChipCloseDelete}
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <span className={classes.spacer}/>
                <div className={classes.row}>
                    <Grid>
                        <Overlay
                            active={SaveButtonLoader}
                            text={''}
                        />
                        <Button
                            color="primary"
                            disabled={Object.keys(anonymizationAssignmentsObject).length === 0}
                            onClick={() => handleClickOpenConfirmation()}
                            variant="contained"
                        >
                            Apply Anonymization
                        </Button>
                        <Dialog
                            aria-labelledby="form-dialog-title"
                            onClose={handleClickOpenConfirmation}
                            open={OpenConfirmation}
                        >
                            <DialogTitle id="form-dialog-title">Do you want to continue with the following anonymization
                                techniques</DialogTitle>
                            <DialogContent>
                                <List
                                    aria-label="mailbox folders"
                                    className={classes.root}
                                    component="nav"
                                >
                                    {printStatement.map((statement, index) => (
                                        <div>
                                            <ListItem key={index}>
                                                <ListItemText
                                                    key={statement + '-' + index}
                                                    primary={statement}
                                                />
                                            </ListItem>
                                            <Divider/>
                                        </div>
                                    ))}
                                </List>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    color="primary"
                                    onClick={ApplyAnonymization}
                                >
                                    Apply Now
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={handleCloseConfirmation}
                                >
                                    Cancel
                                </Button>

                            </DialogActions>
                        </Dialog>
                        <div/>
                        <Divider/>

                        <Button
                            color="primary"
                            disabled={!(fileNameFormState.isValid && (Object.keys(anonymizationAssignmentsObject).length === 0 || SaveButtonDisable))}
                            fullWidth
                            onClick={() => documentId === 0 || !documentId ? saveDataset() : updateDataset()}
                            variant="contained"
                        >
                            {documentId === 0 || !documentId ? 'Save Dataset' : 'Update Dataset'}
                        </Button>
                    </Grid>
                </div>
            </div>
            <span className={classes.spacer}/>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={4000}
                onClose={() => handleCloseSnackBar('success')}
                open={openSuccess}

            >
                <SnackBarWrapper

                    message="The dataset is saved!"
                    onClose={() => handleCloseSnackBar('success')}
                    variant="success"
                />
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}

                autoHideDuration={2000}

                onClose={() => handleCloseSnackBar('error')}
                open={openError}

            >
                <SnackBarWrapper

                    message="Something went wrong!"
                    onClose={() => handleCloseSnackBar('error')}
                    variant="error"
                />
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={2000}
                onClose={() => handleCloseSnackBar('error')}
                open={openError}
            >
                <SnackBarWrapper
                    message="Document title already exists!"
                    onClose={() => handleCloseSnackBar('error')}
                    variant="error"
                />
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={2000}
                onClose={() => handleCloseSnackBar('InputError')}
                open={openErrorIncomInput}
            >
                <SnackBarWrapper
                    message="Please fill the all inputs for selected anonymization type"
                    onClose={() => handleCloseSnackBar('InputError')}
                    variant="error"
                />
            </Snackbar>

            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={2000}
                onClose={() => handleCloseSnackBar('errorSpecial')}
                open={openErrorSpecial}
            >
                <SnackBarWrapper
                    message="Filename contains special characters"
                    onClose={() => handleCloseSnackBar('errorSpecial')}
                    variant="error"
                />
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={2000}
                onClose={() => handleCloseSnackBar('errorEmptyString')}
                open={openErrorEmptyString}
            >
                <SnackBarWrapper
                    message="Filename is empty"
                    onClose={() => handleCloseSnackBar('errorEmptyString')}
                    variant="error"
                />
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={2000}
                onClose={() => handleCloseSnackBar('MaskingRangeError')}
                open={openMaskRangeError}
            >
                <SnackBarWrapper
                    message="Masking Range should be a positive whole number"
                    onClose={() => handleCloseSnackBar('MaskingRangeError')}
                    variant="error"
                />
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={2000}
                onClose={() => handleCloseSnackBar('GenStepError')}
                open={openGenStepError}
            >
                <SnackBarWrapper
                    message="Step Size should be greater than 0"
                    onClose={() => handleCloseSnackBar('GenStepError')}
                    variant="error"
                />
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={2000}
                onClose={() => handleCloseSnackBar('InputError')}
                open={openErrorIncomInput}
            >
                <SnackBarWrapper
                    message="Please fill the all inputs for selected anonymization type"
                    onClose={() => handleCloseSnackBar('InputError')}
                    variant="error"
                />
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={2000}
                onClose={() => handleCloseSnackBar('MaskingDecimalError')}
                open={openMaskDecimalError}
            >
                <SnackBarWrapper
                    message="Masking Range should be a whole number only"
                    onClose={() => handleCloseSnackBar('MaskingDecimalError')}
                    variant="error"
                />
            </Snackbar>


            <Card>

                <TextField
                    //className={classes.TheInput}
                    // labelFontSize={40}
                    error={hasError('fileName')}
                    fontSize={40}
                    helperText={
                        hasError('fileName') ? fileNameFormState.error.fileName[0] : null
                    }
                    label="FileName"
                    name="fileName"
                    onChange={changeFileName}
                    placeholder="Enter FileName"
                    value={fileNameFormState.value.fileName || ''}
                />
                <CardContent className={classes.content}>
                    <PerfectScrollbar>
                        <div className={classes.inner}>
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
                                                        aria-controls="simple-menu"
                                                        aria-haspopup="true"
                                                        className={classes.button}
                                                        onClick={() => handleClickOpen(column.orderPosition)}
                                                        style={anonymizationAssignmentsObject[column.orderPosition] ? anonymizationAssignmentsObject[column.orderPosition].color : Default}
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
                                    {Array.from(Array(10).keys()).map(index => (
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
                            <Dialog
                                aria-labelledby="form-dialog-title"
                                onClose={handleClose}
                                open={open}
                            >
                                <DialogTitle id="form-dialog-title">Anonymization</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Select the Anonymization type from the following:
                                    </DialogContentText>
                                    <Grid>
                                        <Radio
                                            checked={selectedValue === 'None'}
                                            inputProps={{ 'aria-label': 'None' }}
                                            name="radio-button-demo"
                                            onChange={handleRadioChange}
                                            value="None"
                                        />
                                        <label>None</label>
                                        <span className={classes.spacer}/>
                                    </Grid>
                                    {/* {selectedValue == 'None'} */}
                                    <Grid>

                                        <Radio
                                            checked={selectedValue === 'Masking'}
                                            inputProps={{ 'aria-label': 'Masking' }}
                                            name="radio-button-demo"
                                            onChange={handleRadioChange}
                                            value="Masking"
                                        />
                                        <label>Masking</label>
                                    </Grid>
                                    {selectedValue === 'Masking' &&
                                    <Grid>


                                        <label>Start</label>
                                        <Radio
                                            checked={selectedValue_Start === 'Left'}
                                            inputProps={{ 'aria-label': 'Left' }}
                                            name="radio-button-demo"
                                            onChange={handleRadioChange_Start}
                                            value="Left"
                                        />
                                        <label>Left</label>
                                        <Radio
                                            checked={selectedValue_Start === 'Right'}
                                            inputProps={{ 'aria-label': 'Right' }}
                                            name="radio-button-demo"
                                            onChange={handleRadioChange_Start}
                                            value="Right"
                                        />
                                        <label>Right</label>
                                        <TextField
                                            autoFocus
                                            fullWidth
                                            id="name"
                                            InputProps={{
                                                readOnly: false
                                            }}
                                            label="Pattern"
                                            margin="dense"
                                            onChange={handleRadioChangeMaskPat}
                                            value={selectedValueMaskPat}
                                        />
                                        <TextField

                                            fullWidth

                                            InputProps={{ inputProps: { min: 1, max: 10 } }}
                                            label="Range"
                                            margin="dense"
                                            onChange={handleRadioChangeMaskRange}
                                            type="Number"
                                            value={selectedValueMaskRange}
                                        />

                                    </Grid>

                                    }
                                    <Grid>
                                        <Radio
                                            checked={selectedValue === 'Hashing'}
                                            inputProps={{ 'aria-label': 'Hashing' }}
                                            name="radio-button-demo"
                                            onChange={handleRadioChange}
                                            value="Hashing"
                                        />
                                        <label>Hashing</label>
                                        <span className={classes.spacer}/>
                                    </Grid>
                                    {selectedValue === 'Hashing' &&
                                    <Grid>
                                        <label>Cipher</label>
                                        <Radio
                                            checked={selectedValue_Cipher === 'SHA1'}
                                            inputProps={{ 'aria-label': 'SHA1' }}
                                            name="radio-button-demo"
                                            onChange={handleRadioChange_Cipher}
                                            value="SHA1"
                                        />
                                        <label>SHA1</label>
                                        <Radio
                                            checked={selectedValue_Cipher === 'SHA256'}
                                            inputProps={{ 'aria-label': 'SHA256' }}
                                            name="radio-button-demo"
                                            onChange={handleRadioChange_Cipher}
                                            value="SHA256"
                                        />
                                        <label>SHA256</label>

                                    </Grid>}
                                    <Grid>
                                        <Radio
                                            checked={selectedValue === 'HashingWithSalt'}
                                            inputProps={{ 'aria-label': 'HashingWithSalt' }}
                                            name="radio-button-demo"
                                            onChange={handleRadioChange}
                                            value="HashingWithSalt"
                                        />
                                        <label>Hashing With Salt</label>
                                        <span className={classes.spacer}/>
                                    </Grid>
                                    {selectedValue === 'HashingWithSalt' &&
                                    <Grid>
                                        <label>Cipher</label>
                                        <Radio
                                            checked={selectedValue_Cipher === 'SHA1'}
                                            inputProps={{ 'aria-label': 'SHA1' }}
                                            name="radio-button-demo"
                                            onChange={handleRadioChange_Cipher}
                                            value="SHA1"
                                        />
                                        <label>SHA1</label>
                                        <Radio
                                            checked={selectedValue_Cipher === 'SHA256'}
                                            inputProps={{ 'aria-label': 'SHA256' }}
                                            name="radio-button-demo"
                                            onChange={handleRadioChange_Cipher}
                                            value="SHA256"
                                        />
                                        <label>SHA256</label>

                                    </Grid>}

                                    <Grid>
                                        <Radio
                                            checked={selectedValue === 'Random Sort'}
                                            inputProps={{ 'aria-label': 'Random Sort' }}
                                            name="radio-button-demo"
                                            onChange={handleRadioChange}
                                            value="Random Sort"
                                        />
                                        <label>Random Sort</label>
                                        <span className={classes.spacer}/>
                                    </Grid>
                                    {/* {selectedValue == 'Random'} */}
                                    <Grid>
                                        <Radio
                                            checked={selectedValue === 'Generalization'}
                                            inputProps={{ 'aria-label': 'Generalization' }}
                                            name="radio-button-demo"
                                            onChange={handleRadioChange}
                                            value="Generalization"
                                        />
                                        <label>Generalization</label>
                                        <span className={classes.spacer}/>
                                    </Grid>
                                    {selectedValue === 'Generalization' &&
                                    <Grid>
                                        <TextField
                                            autoFocus
                                            fullWidth
                                            id="name"
                                            InputProps={{
                                                readOnly: false
                                            }}
                                            label="Step Size :"
                                            margin="dense"
                                            onChange={handleRadioChangeGenStep}
                                            type="Number"
                                            value={selectedValueGenStep}
                                        />

                                    </Grid>
                                    }

                                    <Grid>
                                        <Radio
                                            checked={selectedValue === 'DeletetheColumn'}
                                            inputProps={{ 'aria-label': 'DeletetheColumn' }}
                                            name="radio-button-demo"
                                            onChange={handleRadioChange}
                                            value="DeletetheColumn"
                                        />
                                        <label>Delete the Column</label>
                                        <span className={classes.spacer}/>
                                    </Grid>


                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        color="primary"
                                        onClick={saveAnnonymizationType}
                                    >
                                        Save Anonymization Type
                                    </Button>
                                    <Button
                                        color="primary"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </PerfectScrollbar>
                </CardContent>
                <CardActions className={classes.actions}>
                    {/* <TablePagination
                component="div"
                count="10"
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            /> */}
                </CardActions>
            </Card>
        </div>
    );
};

EditorTable.propTypes = {
    className: PropTypes.string
};

export default EditorTable;
