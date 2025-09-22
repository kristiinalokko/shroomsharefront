<template>
  <h1>
    {{ location.locationName }}
  </h1>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        Siia tuleb pilt
        <LocationImage/>
<!--        <img src="../assets/forest.jpg" height="1080" width="1613"/>-->
      </div>
      <div class="col">
        Siia tulevad kirjeldus ja seene liikide nimekiri ja allpool nurgas punane süda
      </div>
    </div>
    <div class="row">
      <div class="col">
        Siia tulevad kommentaarid
      </div>
    </div>
    <div class="row justify-content-lg-end">
      <div class="col">
        Siia tulevad nupud: muuda (kui admin või user), kustuta (kui admin või user), tagasi
      </div>
    </div>
  </div>
</template>

<script>
import LoginService from "@/services/LoginService";
import {useRoute} from "vue-router";
import LocationImage from "@/components/LocationImage.vue";
import FavoriteService from "@/services/FavoriteService";

export default {
  name: 'LocationView',
  components: {LocationImage},
  data() {
    return {
      locationId: Number(useRoute().query.locationId),
      userId: sessionStorage.getItem("userId"),

      errorResponse: {
        message: '',
        errorCode: 0
      },

      location: {
        userId: 0,
        locationName: '',
        latitude: 0,
        longitude: 0,
        description: '',
        locationImage: '',
        username: '',
        createdAt: '',
        avgRating: 0
      }

    }
  },
  methods: {

    getLocation() {
      LoginService.sendLocationRequest(this.locationId)
          .then(response => this.handleGetLocationResponse(response))
          .catch(error => this.handleErrorResponse(error))
    },

    getFavorite() {
      FavoriteService.getFavorite(this.locationId, this.userId)
          .then()
          .catch()
    },

    handleGetLocationResponse(response) {
      this.location = response.data
    },

    handleErrorResponse(error) {
      this.errorResponse = error.response.data
    }

  },
  mounted() {
    this.getLocation(this.locationId);


  }
}
</script>