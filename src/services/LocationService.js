import axios from "axios";

export default {

    sendLocationRequest(locationId) {
        return axios.get('/location', {
            params: {
                locationId: locationId
            }})
    },



}