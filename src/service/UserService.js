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


const getUserByUsername = (username) =>
    HttpService.get(baseURL + '/getUserByUsername/' + username);

const searchUser = (match) => {
    return HttpService.get(baseURL + '/search/' + match).then(resp => {
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
}

const removeFriend = (username) => {
    const body = { username: username };

    return HttpService.post(baseURL + '/removeFriend', body)
        .catch(e => console.error(e));
}

const groups = () => {
    return HttpService.get(baseURL + '/groups')
        .then(res => { return res.json(); })
        .catch(e => console.error(e));
}

const friends = () => {
    return HttpService.get(baseURL + '/friends')
        .then(res => { return res.json(); })
        .catch(e => console.error(e));
}


export default {
    getCurrentUserData,
    checkUserEmailExist,
    getUserByUsername,
    searchUser,
    addFriend,
    removeFriend,
    groups,
    friends
};
