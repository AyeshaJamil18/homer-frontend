'use strict';

import HttpService from './HttpService';

const baseURL = process.env.REACT_APP_BACKEND_API_URL + '/stats';

const abstractGetStats = (url) => HttpService.get(url)
    .then(resp => {
        if (resp.status === 200) {
            return resp.json().then(obj => Promise.resolve(obj.count));
        } else {
            return Promise.reject();
        }
    });

const getTotalUserCount = () =>
    abstractGetStats(baseURL + '/totalUserCount');

const getTotalDocumentCount = () =>
    abstractGetStats(baseURL + '/totalDocumentCount');

const getTotalPublicDocumentCount = () =>
    abstractGetStats(baseURL + '/totalPublicDocumentCount');

export default {
    getTotalUserCount,
    getTotalDocumentCount,
    getTotalPublicDocumentCount
};
