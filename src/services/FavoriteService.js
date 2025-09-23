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

    addFavorite(userId, locationId) {
        return axios.post('/favorite', null,
            {
                params: {
                    userId: userId,
                    locationId: locationId
                }
            }
        )
    },

    deleteFavorite(userId, locationId) {
        return axios.delete('/favorite', {
            params: {
                userId: userId,
                locationId: locationId
            }
        })
    }
}
;