import router from "@/router";

export default {

    navigateToHome() {
        router.push({name: 'home'});
    },

    navigateToError() {
        router.push({name: 'ErrorView'})
    },

    navigateToEdit(locationId) {
        router.push({name: 'location', query: {locationId:locationId}})
    },

};