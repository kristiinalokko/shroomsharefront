import axios from "axios";

export default {

    getComments(locationId) {
        return axios.get('/comment', {params: {locationId: locationId}})
    },

    postComment(comment) {
        return axios.post('/comment', comment)
    },

}