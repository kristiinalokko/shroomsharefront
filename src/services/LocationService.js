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

    sendUpdateLocationRequest(location, locationId) {
        return axios.put('/location', location, {params: { locationId: locationId}})
    },

    sendGetMapLocationsAllRequest() {
        return axios.get('/map-locations/all');
    },

    sendGetAllTableLocationsRequest() {
        return axios.get('/locationsTable');
    },

    deactivateLocation(locationId) {
        return axios.delete('/location-info', {
            params: {
                    locationId: locationId
                }
        })
    },
    sendGetFilteredMapLocationsRequest(params) {
        return axios.get(`/map-locations/filtered`, { params });
    },
    getShroomLocations(shroomId){
        return axios.get("/map-locations/shroom", {
            params:{
                shroomId:shroomId
            }
        })
    }
}
