import router from "@/router";

export default {

    navigateToHome() {
        router.push({name: 'home'});
    },

    navigateToEdit(locationId) {
        router.push({name: 'location', query: {locationId:locationId}})
    },

};