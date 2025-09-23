import axios from "axios";

export default {

    sendLocationRequest(locationId) {
        return axios.get('/location-info', {
            params: {
                locationId: locationId
            }})
    },



}