<template>
  <h1>
    {{ location.locationName }}
  </h1>

  <div class="container text-center">
    <AddCommentModal :add-comment-modal-is-open="addCommentModalIsOpen" :location-id="locationId"
                     @event-close-modal="closeAddCommentModal"
                     @event-new-comment-added="handleNewCommentAdded"/>

    <div class="row">
      <div class="col">
        <LocationImage :image-data="location.locationImage" :default-image-data="forestImageData"/>
      </div>
      <div class="col">
        <div class="row m-5">
          Kirjeldus:
          {{ location.description }}
        </div>
        <div class="row m-5">
          Selle asukoha seened:
          <div v-for="shroom in shrooms" class="row mb-3">
            <router-link :to="{ path: '/shroom', query: { shroomId: shroom.shroomId } }">
              {{ shroom.shroomName }}
            </router-link>
          </div>
        </div>
        <div class="row m-5">
          Lisatud: {{ location.createdAt }}
        </div>
        <div class="row m-5 justify-content-center">
          Lisa lemmikute hulka:
          <Favorite v-if="isLoggedIn" :is-favorite="isFavorite"
                    @event-delete-favorite="handleDeleteFavorite"
                    @event-add-favorite="handleAddFavorite"/>
        </div>
      </div>
    </div>
    <div class="row justify-content-end">
      <div class="col">
        <StarRating :avg-rating="location.avgRating"/>
        <template>
          <div>
            <b-form-rating v-model="rating"></b-form-rating>
            <p class="mt-2">rating: {{ rating }}</p>
          </div>
        </template>
      </div>
      <div class="col">
      </div>
      <div class="col">
        <button @click="NavigationService.navigateToEdit(locationId)" type="button" class="btn btn-secondary col-3 me-3">Muuda</button>
        <button @click="deleteLocation" type="button" class="btn btn-secondary col-3 me-3">Kustuta</button>
        <button @click="$router.go(-1)" type="button" class="btn btn-secondary col-3">Tagasi</button>

      </div>
    </div>
    <div class="row justify-content-center">

      <div v-if="comments.length > 0">

        Kommentaarid asukoha kohta:

        <CommentPaginator :comments="comments"/>

      </div>
      <font-awesome-icon @click="openAddCommentModal" icon="fa-solid fa-circle-plus" class="fa-3x"/>

    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import Image from "@/components/Image.vue";
import FavoriteService from "@/services/FavoriteService";
import LocationService from "@/services/LocationService";
import SessionStorageService from "@/services/SessionStorageService";
import Favorite from "@/components/Favorite.vue";
import Comment from "@/components/Comment.vue";
import CommentService from "@/services/CommentService";
import defaultForestImage from '@/assets/forest.jpg'
import AddCommentModal from "@/components/modal/AddCommentModal.vue";
import CommentPaginator from "@/components/pagenation/CommentPagenator.vue";
import StarRating from "@/components/rating/StarRating.vue";
import ShroomService from "@/services/ShroomService";
import NavigationService from "@/services/NavigationService";

export default {
  name: 'LocationView',
  computed: {
    NavigationService() {
      return NavigationService
    }
  },
  components: {StarRating, AddCommentModal, Comment, CommentPaginator, Favorite, LocationImage: Image},
  data() {
    return {
      locationId: Number(useRoute().query.locationId),
      userId: Number(sessionStorage.getItem("userId")),
      isLoggedIn: false,
      isFavorite: false,
      forestImageData: defaultForestImage,
      addCommentModalIsOpen: false,
      rating: 3,

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
          ],

      shrooms:
          [
            {
              shroomId: 0,
              shroomName: "string"
            },
          ],
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

    getShrooms(locationId) {
      ShroomService.getShroomsByLocationId(locationId)
          .then(response => this.shrooms = response.data)
          .catch(error => this.handleErrorResponse(error))
    },

    deleteLocation() {
      LocationService.deactivateLocation(this.locationId)
          .then(() => NavigationService.navigateToHome())
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
      alert("ei kustuta")
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

    openAddCommentModal() {
      this.addCommentModalIsOpen = true;
    },

    closeAddCommentModal() {
      // this.getComments(this.locationId);
      this.addCommentModalIsOpen = false
    },

    handleNewCommentAdded(newComment) {
      this.getComments(this.locationId);
      this.getLocation(this.locationId);

    },


  },
  mounted() {
    this.getLocation(this.locationId);

    this.isLoggedIn = SessionStorageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.getFavorite(this.locationId, this.userId)
    }

    this.getComments(this.locationId);

    this.getShrooms(this.locationId);

  }
}

</script>