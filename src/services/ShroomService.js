import axios from "axios";

export default {

    sendShroomRequest(shroomId) {
        return axios.get("/shroom", {
            params:{
                shroomId: shroomId
            }
        })
    },
    getAllShrooms() {
        return axios.get("/shrooms");
    },
    getShroomsByLocationId(locationId) {
        return axios.get("/location/shrooms", {
            params: {
                locationId: locationId
            }
        })
    },
    getLocationShrooms(locationId) {
        return axios.get("/location/shrooms", {
            params: {
                locationId: locationId
            }
        })
    },
    addLocationShroom(shroomId, locationId) {
        return axios.post("/location/shroom", null, {
            params: {
                locationId: locationId,
                shroomId: shroomId
            }
        })
    },
    deleteLocationShroom(locationId, shroomId){
        return axios.delete("/location/shroom", {
            params: {
                locationId: locationId,
                shroomId: shroomId
            }
        })
    }
}