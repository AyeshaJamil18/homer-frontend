import HttpService from './HttpService';

const baseURL = process.env.REACT_APP_BACKEND_API_URL + '/video';

const jwtDecode = require('jwt-decode');

const saveVideo = (VideoName, keywords, VideoURL, Duration, User) => {
    const VideoObject = {
        videoTitle: VideoName,
        keywords: keywords,
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


const GetVideoByTag = ( tag) => {

    console.log("Before return")
    return HttpService.get(baseURL + '/GetVideo/'+ tag)
        .then(resp => {
            console.log("FIRST LOOP")
            console.log(resp)

            if (resp.status === 200) {
                return resp.json()
                    .then(json => {
                        console.log("IN THEN Json")
                        return Promise.resolve(resp);
                    });
            } else {
                console.log("IN last return")
                return Promise.reject(resp);
            }
        });
};


export default {
    saveVideo,
    GetVideoByTag
};
