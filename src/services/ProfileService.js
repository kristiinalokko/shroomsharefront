import axios from "axios";

export default {

    sendGetProfileRequest(userId) {
        return axios.get('profile', { params: {userId: userId}})
    },

    sendPutProfileRequest(profile) {
        return axios.put('/profile', profile)
    },

    sendPostProfileRequest(profile) {
        return axios.post('profile', profile)
    },


} 