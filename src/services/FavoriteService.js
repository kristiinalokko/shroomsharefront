import axios from "axios";

export default {

    getFavorite(locationId, userId) {
        return axios.get("/favorite", {
            params: {
                locationId: locationId,
                userId: userId
            }
        })
    }


}