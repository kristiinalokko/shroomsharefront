import axios from "axios";

export default {

    getShroom(shroomId) {
        return axios.get("/shroom", {
            params:{
                shroomId: shroomId
            }
        })
    },
    getShrooms() {
        return axios.get("/shrooms");
    },
    getAllShrooms() {
        return axios.get("/allShrooms");
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
    },
    sendAddShroomRequest(shroom){
        return axios.post("/shroom", shroom)
    }
}