'use strict';

const apiURL = () => {
    return process.env.REACT_APP_BACKEND_API_URL;
};

const get = (url) => generalizedFetch('GET', url);

const put = (url, data) => generalizedFetch('PUT', url, data);

const post = (url, data) => generalizedFetch('POST', url, data);

const remove = (url) => generalizedFetch('DELETE', url);

const generalizedFetch = (method, url, data) => {
    if ((method === 'GET' || method === 'DELETE') && data !== undefined) {
        throw 'Get or delete can\'t have data';
    }

    // BEARER TOKEN GOES HERE
    let token = window.localStorage['bearerToken']; // = '*TOKEN*';
    let header = new Headers();
    if (token) {
        header.append('Authorization', `Bearer ${token}`);
    }

    if (data) {
        header.append('Content-Type', 'application/json');
    }

    return fetch(url, {
        method: method,
        headers: header,
        body: data ? JSON.stringify(data) : undefined
    }).then((resp) => {
        if (checkIfUnauthorized(resp)) {
            return Promise.reject(resp);
        } else {
            if (resp.error) {
                return Promise.reject(resp.error);
            } else {
                return Promise.resolve(resp);
            }
        }
    }).catch((e) => {
        return Promise.reject(e);
    });
};

const checkIfUnauthorized = (res) => {
    return res.status === 401;
};

export default {
    get,
    post,
    put,
    remove,
    checkIfUnauthorized,
    apiURL
};
