import axios from "axios";

export default {

    sendLocationRequest(locationId) {
        return axios.get('/location-info', {
            params: {
                locationId: locationId
            }
        })
    },


    sendNewLocationRequest(location) {
        return axios.post('/location', location)
    },

    sendUpdateLocationRequest(location) {
        return axios.put('/location', location)
    },

    sendGetMapLocationsAllRequest() {
        return axios.get('/map-locations/all');
    },

    deactivateLocation(locationId) {
        return axios.put('/location-info', null, {
            params: {
                    locationId: locationId
                }
        })
    }
}
