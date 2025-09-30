import axios from "axios";

export default{

    getShroomImage(shroomId) {
        return axios.get("/shroom-image", {
            params:{
                shroomId: shroomId
            }
        })
    }
}