<template>
  <h1>
    {{ location.locationName }}
  </h1>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <LocationImage :image-data="location.locationImage"/>
      </div>
      <div class="col">
        <div class="row m-5">
          Kirjeldus:
          {{ location.description }}
        </div>
        <div class="row m-5">
          SEENE KOMPONENT
        </div>
        <div class="row m-5">
          Lisatud: {{ location.createdAt }}
        </div>
      </div>
    </div>
    <div class="row justify-content-end">
      <div class="col">
        TÄHEKESTE KOMPONENT
      </div>
      <div class="col">
      </div>
      <div class="col">
        Lisa lemmikute hulka:
        <Favorite v-if="isLoggedIn" :is-favorite="isFavorite"
                  @event-delete-favorite="handleDeleteFavorite"
                  @event-add-favorite="handleAddFavorite"/>
      </div>
    </div>
    <div class="row">
      <div class="col">
        Kommentaarid asukoha kohta:
        <Comment
            v-for="comment in comments"
            :comment="comment"
        />
      </div>
      <div class="col">

        Siia tulevad nupud: muuda (kui admin või user), kustuta (kui admin või user), tagasi
        <!--        <button v-if="isEdit" @click="navigateToEdit" type="button" class="btn btn-primary">Muuda</button>-->
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
import Comment from "@/components/Comment.vue";
import CommentService from "@/services/CommentService";

export default {
  name: 'LocationView',
  components: {Comment, Favorite, LocationImage},
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
      },

      comments:
          [
            {
              username: '',
              body: '',
              rating: 0,
              created: '',
              imageData: ''
            },
          ]
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

    getComments(locationId) {
      CommentService.getComments(locationId)
          .then(response => this.handleGetCommentsResponse(response))
          .catch(error => this.handleErrorResponse(error))
    },

    handleGetLocationResponse(response) {
      this.location = response.data
    },

    handleGetFavoriteResponse(response) {
      this.isFavorite = response.data
    },

    handleGetCommentsResponse(response) {
      this.comments = response.data
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
    //
    // navigateToEdit() {
    //   NavigationService.navigateToEdit(this.locationId)
    // },

  },
  mounted() {
    this.getLocation(this.locationId);

    this.isLoggedIn = SessionStorageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.getFavorite(this.locationId, this.userId)
    }

    this.getComments(this.locationId);

  }
}
</script>