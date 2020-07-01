'use strict';

import HttpService from './HttpService';
import AuthService from './AuthService';

const baseURL = process.env.REACT_APP_BACKEND_API_URL + '/user';

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

const checkUserEmailExist = (userEmail) =>
    HttpService.get(baseURL + '/checkEmail/' + userEmail);


const apiFindUserByUsername = (username) =>
    HttpService.get(baseURL + '/apiFindUserByUsername/' + username);


export default {
    getCurrentUserData,
    checkUserEmailExist,
    apiFindUserByUsername
};
