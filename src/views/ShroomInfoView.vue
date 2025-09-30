<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <Image :image-data="shroom.shroomImage" :default-image-data="defaultShroomImage"/>
      </div>
      <div class="col">
        <h1>{{ shroom.name }}</h1>
        <div class="row mb-3 justify-content-center">{{ shroom.description }}</div>
        <div v-for="location in shroom.locations" class="row mb-3">
          <router-link :to="{ path: '/location-info', query: { locationId: location.locationId } }">
            {{ location.locationName }}
          </router-link>
        </div>
        <div class="row justify-content-center mt-3">
          <AlertDanger :message="errorMessage"/>
          <button @click="$router.go(-1)" type="button" class="btn btn-secondary col-3">Tagasi</button>
          <button v-if="SessionStorageService.isAdmin() || userId === shroom.userId" @click="shroomModalIsOpen=true" type="button" class="btn btn-primary col-3 me-3">Muuda seent</button>
          <ShroomModal :shroomModalIsOpen="shroomModalIsOpen" :shroomId="shroomId" @event-close-modal="shroomModalIsOpen = false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import defaultShroomImage from "@/assets/shroom.png";
import {useRoute} from "vue-router";
import ShroomService from "@/services/ShroomService";
import Image from "@/components/Image.vue";
import AlertDanger from "@/components/AlertDanger.vue";
import ShroomModal from "@/components/modal/ShroomModal.vue";
import SessionStorageService from "@/services/SessionStorageService";

export default {
  name: 'ShroomInfoView',
  computed: {
    SessionStorageService() {
      return SessionStorageService
    }
  },
  components: {
    ShroomModal,
    AlertDanger,
    Image

  },
  data() {
    return {
      shroomModalIsOpen: false,
      errorMessage: '',
      defaultShroomImage: defaultShroomImage,
      shroomId: Number(useRoute().query.shroomId),
      userId: Number(sessionStorage.getItem("userId")),

      shroom: {
        userId: 0,
        name: '',
        description: '',
        shroomImage: '',
        locations: [
          {
            locationId: 0,
            locationName: ''
          }
        ]
      },

      errorResponse: {
        message: '',
        errorCode: 0,
      }
    }
  },
  methods: {
    getShroom(shroomId) {
      ShroomService.getShroom(shroomId)
          .then(response => this.handleGetShroomResponse(response))
          .catch(error => this.handleErrorResponse(error))
    },

    handleErrorResponse(error) {
      this.errorResponse = error.response.data
      this.errorMessage = this.errorResponse.message
    },
    handleGetShroomResponse(response) {
      this.shroom = response.data
    },
    handleErrorMessage() {
      this.errorMessage = "Ei leitud seent."
      setTimeout(this.resetErrorMessage, 5000)
    },
    resetErrorMessage(){
      this.errorMessage = ''
    }
  },
  mounted() {
    this.resetErrorMessage()
    if (this.shroomId > 0) {
      this.getShroom(this.shroomId)
    } else { this.handleErrorMessage() }
  }
}
</script>