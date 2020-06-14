import HttpService from './HttpService';

const baseURL = process.env.REACT_APP_BACKEND_API_URL + '/accessgroup';

const createAccessGroup = (accessgroup) =>
    HttpService.post(baseURL, accessgroup);

const getDocumentAccessGroup = (documentId) => 
    HttpService.get(baseURL + '/' + documentId);

const addUsersToAccessGroup = (documentId, modifier, userIds) => 
    HttpService.put(baseURL + '/' + documentId + '/' + modifier + '/users', userIds);

const deleteDocumentAccessGroupModifier = (documentId, modifier) => 
    HttpService.remove(baseURL + '/' + documentId + '/' + modifier);

export default {
    createAccessGroup,
    getDocumentAccessGroup,
    addUsersToAccessGroup,
    deleteDocumentAccessGroupModifier
}
