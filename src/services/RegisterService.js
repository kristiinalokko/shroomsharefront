import axios from "axios";

export default {

    sendRegistrationRequest(user){
        return axios.post('/register', user)

    }
}