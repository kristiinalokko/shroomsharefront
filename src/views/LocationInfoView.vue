<template>
  <h1>
    {{ location.locationName }}
  </h1>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        Siia tuleb pilt
        <LocationImage :image-data="location.locationImage"/>
        <!--        <img src="../assets/forest.jpg" height="1080" width="1613"/>-->
      </div>
      <div class="col">
        Siia tulevad kirjeldus ja seene liikide nimekiri
      </div>
    </div>
    <div class="row justify-content-end">
      ja allpool nurgas punane süda
      <Favorite v-if="isLoggedIn" :is-favorite="isFavorite"
                @event-delete-favorite="handleDeleteFavorite"
                @event-add-favorite="handleAddFavorite"/>
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
import {useRoute} from "vue-router";
import LocationImage from "@/components/LocationImage.vue";
import FavoriteService from "@/services/FavoriteService";
import LocationService from "@/services/LocationService";
import SessionStorageService from "@/services/SessionStorageService";
import Favorite from "@/components/Favorite.vue";

export default {
  name: 'LocationView',
  components: {Favorite, LocationImage},
  data() {
    return {
      locationId: Number(useRoute().query.locationId),
      userId: sessionStorage.getItem("userId"),
      isLoggedIn: false,
      isFavorite: false,

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

    getLocation(locationId) {
      LocationService.sendLocationRequest(locationId)
          .then(response => this.handleGetLocationResponse(response))
          .catch(error => this.handleErrorResponse(error))
    },

    getFavorite(locationId, userId) {
      FavoriteService.getFavorite(locationId, userId)
          .then(response => this.handleGetFavoriteResponse(response))
          .catch(error => this.handleErrorResponse(error));
    },

    handleGetLocationResponse(response) {
      this.location = response.data
    },

    handleGetFavoriteResponse(response) {
      this.isFavorite = response.data
    },

    handleErrorResponse(error) {
      this.errorResponse = error.response.data
    },

    handleDeleteFavorite() {
      FavoriteService.deleteFavorite(this.userId, this.locationId)
          .then(() => this.isFavorite = false)
          .catch(error => this.handleErrorResponse(error))
    },

    handleAddFavorite() {
      FavoriteService.addFavorite(this.userId, this.locationId)
          .then(() => this.isFavorite = true)
          .catch(error => this.handleErrorResponse(error))
    },

  },
  mounted() {
    this.getLocation(this.locationId);

    this.isLoggedIn = SessionStorageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.getFavorite(this.locationId, this.userId)
    }



  }
}
</script>