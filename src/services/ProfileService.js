import axios from "axios";

export default {

    sendGetProfileRequest(userId) {
        return axios.get('profile', { params: {userId: userId}})
    },


} 