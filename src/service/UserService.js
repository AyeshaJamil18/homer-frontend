'use strict';

import HttpService from './HttpService';
import AuthService from './AuthService';
import AdminAuthService from './AdminAuthService';


const baseURL = process.env.REACT_APP_BACKEND_API_URL + '/user';
const adminbaseURL = process.env.REACT_APP_BACKEND_API_URL + '/admin';

const getCurrentUserData = () => {
    if (AuthService.isBearerTokenStillValid()) {
        return HttpService.get(baseURL)
            .then(resp => {
                if (resp.status === 200) {
                    return resp.json()
                        .then(json => {

                            return Promise.resolve(json);
                        });
                } else {
                    return Promise.reject(resp);
                }
            });
    } else {
        return Promise.reject('User not logged in');
    }
};

const getCurrentAdminData = () => {
    if (AdminAuthService.isBearerTokenStillValid()) {
        return HttpService.get(adminbaseURL)
            .then(resp => {
                if (resp.status === 200) {
                    return resp.json()
                        .then(json => {

                            return Promise.resolve(json);
                        });
                } else {
                    return Promise.reject(resp);
                }
            });
    } else {
        return Promise.reject('User not logged in');
    }
};

const checkUserEmailExist = (userEmail) =>
    HttpService.get(baseURL + '/checkEmail/' + userEmail);


const apiFindUserByUsername = (username) =>
    HttpService.get(baseURL + '/apiFindUserByUsername/' + username);


export default {
    getCurrentUserData,
    checkUserEmailExist,
    getCurrentAdminData,
    apiFindUserByUsername

};
