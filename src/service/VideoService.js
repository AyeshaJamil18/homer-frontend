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

const GetvideoOfTheDay = () => {

    return HttpService.get(baseURL + '/GetVideoOfDay')
        .then(resp => {
            if (resp.status === 200) {
                console.log(resp);
                return resp.json()
                    .then(json => {
                        return Promise.resolve(json);
                    });
            } else {
                return Promise.reject(resp);
            }
        });
};


const GetVideoByTag = ( tag) => {

      return HttpService.get(baseURL + '/GetVideo/'+ tag)
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
    GetvideoOfTheDay,
    GetVideoByTag
};
