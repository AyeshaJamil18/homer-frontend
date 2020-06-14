'use strict';

import HttpService from './HttpService';

import Util from './Util';

const baseURL = process.env.REACT_APP_BACKEND_API_URL + '/kloudless';

const getFileFromKloudless = (account, file) =>
    HttpService.get(baseURL + '/' + account + '/' + file);

const getFileFromKloudlessAndStore = (account, file) =>
    getFileFromKloudless(account, file)
        .then(resp => {
            if (resp.status === 200) {
                clearStorage();
                const name = Util.getRandomString();

                return resp.text().then(json => {

                    if (storeContent(name, json)) {
                        return Promise.resolve(name);
                    } else {
                        return Promise.reject('Save failed. Content to large?');
                    }
                });
            } else {
                return Promise.reject('Status code was ' + resp.status);
            }
        });

const storeContent = (name, content) => {
    try {
        sessionStorage.setItem(name, content);
        return true;
    } catch (e) {
        return false;
    }
};

const getContent = (name) => sessionStorage.getItem(name);

const clearStorage = () => {
    sessionStorage.clear();
};


export default {
    getFileFromKloudlessAndStore,
    getContent
};
