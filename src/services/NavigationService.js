import router from "@/router";

export default {

    navigateToHome() {
        router.push({name: 'home'});
    },

    navigateToError() {
        router.push({name: 'error'})
    },

    navigateToEdit(locationId) {
        router.push({name: 'location', query: {locationId:locationId}})
    },

    navigateToShroomInfoView(shroomId) {
        router.push({name: 'shroomInfo', query: {shroomId: shroomId}})
    },

    navigateToLocationView(locationId) {
        router.push({name: 'location', query: {locationId: locationId}})
    },


    navigateToLocationInfoView(locationId) {
        router.push({name: 'locationInfo', query: {locationId: locationId}})
    },

    navigateToShroomTable(){
        router.push({name:'shroomTable'})
    }

};