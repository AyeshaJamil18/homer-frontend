import HttpService from './HttpService';

const baseURL = process.env.REACT_APP_BACKEND_API_URL + '/playlist';

const GetPlaylist = () => {

    return HttpService.get(baseURL + '/GetPlaylist/')
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



const AddVideo = (Playlist_Name,Video_id) => {
    const VideoObject = {
        PlaylistName: Playlist_Name,
        VideoId: Video_id
    };

    return HttpService.post(baseURL + '/AddToPlaylist' , VideoObject).then(resp => {
        if (resp.status === 200) {
            return Promise.resolve(resp);
        } else {
            return Promise.reject(resp);
        }
    });
};

export default {
    GetPlaylist,
    AddVideo
};
