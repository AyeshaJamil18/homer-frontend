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


const getUserByUsername = (username) =>
    HttpService.get(baseURL + '/getUserByUsername/' + username);

const searchUser = (match, params) => {
    return HttpService.get(baseURL + '/search/' + match, params).then(resp => {
        if (resp.status === 200) {
            return resp.json()
                .then(json => {
                    return Promise.resolve(json);
                });
        } else {
            return Promise.reject(resp);
        }
    });
};

const addFriend = (username) => {
    const body = { username: username };

    return HttpService.post(baseURL + '/addFriend', body)
        .catch(e => console.error(e));
};

const removeFriend = (username) => {
    return HttpService.remove(baseURL + '/removeFriend/' + username)
        .catch(e => console.error(e));
};

const groups = () => {
    return HttpService.get(baseURL + '/groups')
        .then(res => { return res.json(); })
        .catch(e => console.error(e));
};

const friends = () => {
    return HttpService.get(baseURL + '/friends')
        .then(res => { return res.json(); })
        .catch(e => console.error(e));
};


const addXP = (xp) =>
    HttpService.put(baseURL + '/addXp/' + xp);

const CreatePlaylist = (PlaylistName) =>
    HttpService.post(baseURL + '/CreatePlaylist/' + PlaylistName);


export default {
    getCurrentUserData,
    checkUserEmailExist,
    getUserByUsername,
    searchUser,
    addFriend,
    removeFriend,
    friends,
    getCurrentAdminData,
    addXP,
    groups,
    CreatePlaylist
};
