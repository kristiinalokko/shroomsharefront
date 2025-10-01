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

    sendGetAllTableLocationsRequest(userId) {
        return axios.get('/locationsExtendedInfos', { params: {userId: userId}});
    },

    sendDeactivateLocationRequest(locationId) {
        return axios.delete('/location/deactive', {
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
    },
    sendActivateLocationRequest(locationId) {
        return axios.put("/location/active", null,{
            params:{
                locationId:locationId
            }
        })
    }
}
