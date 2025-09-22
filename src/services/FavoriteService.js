import axios from "axios";

export default {

    getFavorite(locationId, userId) {
        axios.get("/favorite", {
            params: {
                locationId: locationId,
                userId: userId
            }
        })
    }


}