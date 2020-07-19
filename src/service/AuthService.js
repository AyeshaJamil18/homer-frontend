import HttpService from './HttpService';

const baseURL = process.env.REACT_APP_BACKEND_API_URL + '/auth';

const jwtDecode = require('jwt-decode');

const register = (username, email, firstName, lastName, password) => {
    const userObject = {
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password
    };

    return HttpService.post(baseURL + '/register', userObject)
        .then(resp => {
            if (resp.status === 200) { // This should be 201
                return resp.json()
                    .then(json => {
                        handleBearerToken(json);

                        return Promise.resolve(resp);
                    });
            } else {
                return Promise.reject(resp);
            }
        });
};

const login = (email, password) => {
    const loginObject = { email: email, password: password };

    return HttpService.post(baseURL + '/login', loginObject)
        .then(resp => {
            if (resp.status === 200) {
                return resp.json()
                    .then(json => {
                        handleBearerToken(json);
                        return Promise.resolve(resp);
                    });
            } else {
                return Promise.reject(resp);
            }
        });
};

const logout = () => {
    window.localStorage.removeItem('bearerToken');
};

const hasBearerToken = () => {
    return !!window.localStorage['bearerToken'];
};

const isBearerTokenStillValid = () => {
    if (hasBearerToken()) {
        const token = window.localStorage['bearerToken'];
        var decoded = jwtDecode(token);
        const current_time = Date.now() / 1000;
        return decoded.exp >= current_time;
    }
    else
    {
        return false;
    }
};

const handleBearerToken = (resp) => {
    if (resp.hasOwnProperty('token')) {
        window.localStorage['bearerToken'] = resp.token;
    } else {
        throw new Error('Bearer token was not in response');
    }
};

export default {
    register,
    login,
    logout,
    hasBearerToken,
    isBearerTokenStillValid
};
