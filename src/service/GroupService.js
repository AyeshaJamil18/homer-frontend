import HttpService from './HttpService';

const baseURL = process.env.REACT_APP_BACKEND_API_URL + '/group';

const get = (group) => {
    return HttpService.get(baseURL + '/' + group)
        .then(res => { return res.json(); })
        .catch(e => console.error(e));
}

const invite = (group, user) => {
    return HttpService.put(baseURL + '/' + group + '/invite/' + user)
        .then(res => { console.debug(res); })
        .catch(e => console.error(e));
}

const join = (group) => {
    return HttpService.put(baseURL + '/' + group + '/join')
        .then(res => { console.debug(res); })
        .catch(e => console.error(e));
}

const leave = (group) => {
    return HttpService.remove(baseURL + '/' + group + '/leave')
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
    get,
    invite,
    join,
    leave,
    create
};
