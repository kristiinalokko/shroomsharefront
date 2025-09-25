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
}