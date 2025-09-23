import axios from "axios";

export default {

    getFavorite(locationId, userId) {
        return axios.get("/favorite", {
            params: {
                locationId: locationId,
                userId: userId
            }
        })
    },

    updateFavorite(isFavorite, locationId, userId) {
        return axios.put("/favorite",
            {
                isFavorite: isFavorite,
                locationId: locationId,
                userId: userId
            })
    },


};