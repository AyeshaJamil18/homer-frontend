import HttpService from './HttpService';
import AuthService from './AuthService';

const baseURL = process.env.REACT_APP_BACKEND_API_URL + '/group';

const join = (group) => {
    return HttpService.post(baseURL + '/' + group + '/join')
        .then(res => { console.debug(res); })
        .catch(e => console.error(e));
}

const leave = (group) => {
    return HttpService.post(baseURL + '/' + group + '/leave')
        .then(res => { console.debug(res); })
        .catch(e => console.error(e));
}

const create = (title, invited) => {
    const reqObject = {
        title: title,
        invited: invited
    };

    return HttpService.post(baseURL + '/create', reqObject)
        .then(res => { console.debug(res); })
        .catch(e => console.error(e));
}

export default {
    join,
    leave,
    create
};