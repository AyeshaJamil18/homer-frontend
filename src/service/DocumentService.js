import HttpService from './HttpService';

const baseURL = process.env.REACT_APP_BACKEND_API_URL + '/document';

const createDocument = (document) =>
    HttpService.post(baseURL, document);

const getDocument = () => HttpService.get(baseURL);

const downloadDocument = (documentId) =>
    HttpService.get(baseURL + '/' + documentId + '/download');

const getPublicDocuments = () => HttpService.get(baseURL + '/sharedPublic');

const getDocumentsSharedWithMe = () => HttpService.get(baseURL + '/sharedWithMe');

const updateDocument = (document) => 
    HttpService.put(baseURL, document);

const updateDocumentPrivacy = (documentId, body) => 
    HttpService.put(baseURL + '/'+ documentId +'/privacy', body);

const getDocumentById = (documentId) => 
    HttpService.get(baseURL + '/' + documentId);

export default {
    createDocument,
    getDocument,
    downloadDocument,
    getPublicDocuments,
    updateDocument,
    getDocumentById,
    updateDocumentPrivacy,
    getDocumentsSharedWithMe
};
