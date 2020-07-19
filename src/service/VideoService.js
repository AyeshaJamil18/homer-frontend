import HttpService from './HttpService';

const baseURL = process.env.REACT_APP_BACKEND_API_URL + '/video';


const jwtDecode = require('jwt-decode');

const saveVideo = (VideoName, keywords, category, VideoURL, Duration, User) => {

    const VideoObject = {
        videoTitle: VideoName,
        keywords: keywords,
        category: category,
        videoUrl: VideoURL,
        duration: Duration,
        uploader: User
    };

    return HttpService.post(baseURL + '/SaveVideo', VideoObject)
        .then(resp => {
            if (resp.status === 200) {
                return resp.json()
                    .then(json => {
                        return Promise.resolve(resp);
                    });
            } else {
                return Promise.reject(resp);
            }
        });
};

const videoOfTheDay = () => {

    return HttpService.get(baseURL + '/videoOfDay')
        .then(resp => { return resp.json(); }
            /*
            if (resp.status === 200) {
                console.log(resp);
                return resp.json()
                    .then(json => {
                        return Promise.resolve(json);
                    });
            } else {
                return Promise.reject(resp);
            }*/
        )
        .catch(e => console.error(e));
};


const GetVideoByTag = ( tag) => {

    return HttpService.get(baseURL + '/video/'+ tag)
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
};

export default {
    saveVideo,
    videoOfTheDay,
    GetVideoByTag
};
