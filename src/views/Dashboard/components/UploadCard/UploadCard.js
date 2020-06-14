import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Button, Card, CardContent, Grid, Snackbar, Typography } from '@material-ui/core';
import { Cloud, Save } from '@material-ui/icons';

import { CSVReader } from 'react-papaparse';
import { useHistory } from 'react-router-dom';

import MutexPromise from 'mutex-promise';

import ButtonGroup from '@material-ui/core/ButtonGroup';

import CloudFilePicker from './CloudFilePicker';
import Overlay from '../../../Overlay';
import KloudlessService from '../../../../service/KloudlessService';
import DexieService from '../../../../service/DexieService';
import CSVParserService from '../../../../service/ParsingService/CSVParserService';

import { SnackBarWrapper } from '../../../../components';

const mutex = new MutexPromise('cloudProviderMutex');
let cloudPickerActive = false;

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    title: {
        fontWeight: 700
    },
    chartContainer: {
        position: 'relative',
        height: 'auto'
    },
    stats: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center'
    },
    device: {
        textAlign: 'center',
        padding: theme.spacing(1)
    },
    deviceIcon: {
        color: theme.palette.icon
    },
    button: {
        margin: theme.spacing(0.5),
        alignSelf: 'stretch',
        variant: 'success'
    },
    input: {
        display: 'none'
    },
    rowContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
}));


const UploadCard = props => {
    const { className, ...rest } = props;

    let history = useHistory();
    const [openErrorSnackbar, setOpenErrorSuccessSnackBar] = React.useState(false);
    const [errorSnackBarMessage, setErrorSnackBarMessage] = React.useState('');

    const [openSuccessSnackBar, setOpenSuccessSnackBar] = React.useState(false);
    const [successSnackBarMessage, setSuccessSnackBarMessage] = React.useState('');

    const [overlayActive, setOverlayActive] = React.useState(false);
    const [overlayText, setOverlayText] = React.useState('Loading');

    const [kloudlessPickerAssigned, setKloudlessPickerAssigned] = React.useState(false);

    const classes = useStyles();
    const theme = useTheme();
    const fileInput = React.createRef();

    const options = {
        legend: {
            display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        cutoutPercentage: 80,
        layout: { padding: 0 },
        tooltips: {
            enabled: true,
            mode: 'index',
            intersect: false,
            borderWidth: 1,
            borderColor: theme.palette.divider,
            backgroundColor: theme.palette.white,
            titleFontColor: theme.palette.text.primary,
            bodyFontColor: theme.palette.text.secondary,
            footerFontColor: theme.palette.text.secondary
        }
    };

    const FILE_SIZE_LIMIT = process.env.REACT_APP_FILE_SIZE_LIMIT || 10000000;
    const COLUMN_COUNT_LIMIT = process.env.REACT_APP_FILE_COLUMN_COUNT_LIMIT || 50;

    const handleCloseErrorSnackBar = () => {
        setErrorSnackBarMessage('');
        setOpenErrorSuccessSnackBar(false);
    };

    const handleCloseSuccessSnackBar = () => {
        setSuccessSnackBarMessage('');
        setOpenSuccessSnackBar(false);
    };

    const handleReadCSV = async (data) => {
        const fileName = fileInput.current.files[0].name;

        if (fileName.slice(-4) !== '.csv') {
            setErrorSnackBarMessage('File type must be csv');
            setOpenErrorSuccessSnackBar(true);
            return;
        }
        if (fileInput.current.files[0].size > FILE_SIZE_LIMIT) {
            setErrorSnackBarMessage('File size must be smaller than 10MB');
            setOpenErrorSuccessSnackBar(true);
            return;
        }
        if (fileInput.current.files[0].size === 0) {
            setErrorSnackBarMessage('File size must be greater than 0');
            setOpenErrorSuccessSnackBar(true);
            return;
        }
        if (data.meta.fields.length > COLUMN_COUNT_LIMIT) {
            setErrorSnackBarMessage('Column size must be smaller than '
                + COLUMN_COUNT_LIMIT);
            setOpenErrorSuccessSnackBar(true);
            return;
        }

        setOverlayActive(true);

        setSuccessSnackBarMessage('Parsing file ' + fileName);
        setOpenSuccessSnackBar(true);

        // Wait half a second so messages are displayed properly
        await new Promise(resolve => setTimeout(resolve, 500, 500));

        const result = CSVParserService.convertToDocumentObj(data);
        result.fileName = fileName;

        setOverlayActive(false);
        forwardToEditorWithData(result);
    };

    const forwardToEditorWithData = (data) => {
        // Convert object to array
        data.data = Object.values(data.data);

        //store data
        DexieService.flushDocumentDb()
            .then(() => DexieService.addDocument(data).then(id => history.push({
                pathname: '/editor',
                state: {
                    dexieDocumentId: id
                    /*
                    columns: data.headers,
                    columnsData: Object.values(data.data),
                    fileName: data.fileName,
                    id: 0*/
                }
            })));
    };

    const handleOnError = (err, file, inputElem, reason) => {
        console.log('fileError');
        console.log(err);
    };

    const handleImportOffer = () => {
        fileInput.current.click();
        //console.log(fileInput);
    };

    const handleCloudFilePickerSuccess = async (files) => {
        setOverlayActive(true);

        // Check file first
        const myFile = files[0];
        if (myFile.size > FILE_SIZE_LIMIT) {
            setOverlayActive(false);
            setErrorSnackBarMessage('File size must be smaller than 10MB');
            setOpenErrorSuccessSnackBar(true);
            return;
        } else if (myFile.mime_type !== 'text/csv') {
            setOverlayActive(false);
            setErrorSnackBarMessage('File type must be csv');
            setOpenErrorSuccessSnackBar(true);
            return;
        }

        setSuccessSnackBarMessage('Requested file ' + myFile.name + ' from server');
        setOpenSuccessSnackBar(true);

        // Sometimes the picker submits multiple times
        // Always does when uploading one document, then going back with backspace and then uploading another document
        mutex.lock();
        if (cloudPickerActive) {
            return;
        } else {
            cloudPickerActive = true;
        }
        mutex.unlock();

        if (myFile) {
            KloudlessService.getFileFromKloudlessAndStore(myFile.account, myFile.id)
                .then(name => {
                    const csvData = CSVParserService.readFromKloudlessToCsv(name);

                    /*if (csvData.meta.fields.length > COLUMN_COUNT_LIMIT) {
                        setOverlayActive(false);
                           // sadly this often is not displayed on the frontend
                           // the Kloudless picker fires multiple times.
                           // Only at the first time, the correct references to the overlay and the error
                           // are set correctly. Following executions have stale references which do not
                           // change the view of the front end
                        setErrorMessage('Column size must be smaller than '
                            + COLUMN_COUNT_LIMIT);
                        setOpenError(true);
                        return;
                    }*/


                    const result = CSVParserService.convertToDocumentObj(csvData);
                    result.fileName = myFile.name;

                    setOverlayActive(false);
                    forwardToEditorWithData(result);

                    cloudPickerActive = false;
                })
                .catch(myError => {
                    setErrorSnackBarMessage(myError);
                    setOpenErrorSuccessSnackBar(true);

                    setOverlayActive(false);

                    console.log(myError);
                    cloudPickerActive = false;
                });
        }
    };

    useEffect(() => {
        if (!kloudlessPickerAssigned) { // prevent this from firing multiply times
            CloudFilePicker.choosify(document.getElementById('upload-cloud-btn'));
            CloudFilePicker.on('success', handleCloudFilePickerSuccess);

            setKloudlessPickerAssigned(true);
        }
    }, []); // only execute once -> [] no dependencies

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={4000}
                onClose={handleCloseErrorSnackBar}
                open={openErrorSnackbar}
            >
                <SnackBarWrapper
                    message={errorSnackBarMessage}
                    onClose={handleCloseErrorSnackBar}
                    variant="error"
                />
            </Snackbar>

            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={6000}
                onClose={handleCloseSuccessSnackBar}
                open={openSuccessSnackBar}
            >
                <SnackBarWrapper
                    message={successSnackBarMessage}
                    onClose={handleCloseSuccessSnackBar}
                    variant="success"
                />
            </Snackbar>


            <CardContent>
                <Overlay
                    active={overlayActive}
                    text={overlayText}
                />
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
                        >
                            FILE UPLOAD
                        </Typography>
                    </Grid>
                </Grid>

                <CSVReader
                    configOptions={{ header: true }}
                    inputRef={fileInput}
                    onError={handleOnError}
                    onFileLoaded={handleReadCSV}
                    style={{ display: 'none' }}
                />
                <Grid
                    container
                    justify="space-between"
                >
                    <ButtonGroup
                        aria-label="outlined primary button group"
                        className="d-flex"
                        color="primary"
                        size="small"
                        fullWidth
                    >
                        <Button
                            className={classes.button}
                            component="span"
                            endIcon={<Save/>}
                            id="upload-local-btn"
                            onClick={handleImportOffer}
                        >Local Upload</Button>
                        <Button
                            className={classes.button}
                            component="span"
                            endIcon={<Cloud/>}
                            id="upload-cloud-btn"
                        >Cloud Upload</Button>
                    </ButtonGroup>
                </Grid>
            </CardContent>
        </Card>
    );
};

UploadCard.propTypes = {
    className: PropTypes.string,
    history: PropTypes.object
};

export default UploadCard;
