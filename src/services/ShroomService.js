import axios from "axios";

export default {

    getShroomDetailedInfo(shroomId) {
        return axios.get("/shroom/detailed", {
            params: {
                shroomId: shroomId
            }
        })
    },
    getShrooms() {
        return axios.get("/shrooms");
    },
    getAllShroomsDetailedInfo() {
        return axios.get("/shrooms/detailed/all");
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
    deleteLocationShroom(locationId, shroomId) {
        return axios.delete("/location/shroom", {
            params: {
                locationId: locationId,
                shroomId: shroomId
            }
        })
    },
    sendAddShroomRequest(userId, shroomData) {
        return axios.post("/shroom", shroomData, {
            params:{
                userId:userId
            }
        })
    },
    sendUpdateShroomRequest(shroomId, shroomData) {
        return axios.post("/shroom", shroomData, {
            params:{
                shoomId:shroomId
            }
        })
    },
    sendDeleteRequest(shroomId) {
        return axios.delete("/shroom", {
            params:{
                shroomId:shroomId
            }
        })
    },
    sendActivateShroomRequest(shroomId) {
        return axios.put("/shroom/active", null, {
            params:{
                shroomId:shroomId
            }
        })
    }
}