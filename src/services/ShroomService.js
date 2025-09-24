import axios from "axios";

export default {

    sendShroomRequest(shroomId) {
        return axios.get("/shroom", {
            params:{
                shroomId: shroomId
            }
        })
    }
}