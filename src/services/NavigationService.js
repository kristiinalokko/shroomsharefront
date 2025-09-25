import router from "@/router";

export default {

    navigateToHome() {
        router.push({name: 'home'});
    },

    navigateToError() {
        alert("OOps, midagi läks valesti")
    },

    navigateToEdit(locationId) {
        router.push({name: 'location', query: {locationId:locationId}})
    },

};