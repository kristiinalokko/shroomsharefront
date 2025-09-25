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
          <button @click="$router.go(-1)" type="button" class="btn btn-secondary">Tagasi</button>
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

export default {
  name: 'ShroomView',
  components: {
    AlertDanger,
    Image

  },
  data() {
    return {
      errorMessage: '',
      defaultShroomImage: defaultShroomImage,
      shroomId: Number(useRoute().query.shroomId),

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
      ShroomService.sendShroomRequest(shroomId)
          .then(response => this.handleGetShroomResponse(response))
          .catch(error => this.handleErrorResponse(error))
    },

    handleErrorResponse(error) {
      this.errorResponse = error.response.data
      alert(this.errorResponse.message)
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
    if (this.shroomId > 0) {
      this.getShroom(this.shroomId)
    } else { this.handleErrorMessage() }
  }
}
</script>