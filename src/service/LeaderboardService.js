import HttpService from './HttpService';

const baseURL = process.env.REACT_APP_BACKEND_API_URL + '/leaderboard';

const generateRanking = (leaderboard) => {
    return HttpService.get(baseURL + '/generateRanking/' + leaderboard)
        .then(res => { return res.json(); })
        .catch(e => console.error(e));
}

export default {
    generateRanking
};