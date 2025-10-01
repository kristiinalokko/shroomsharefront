<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <Image :image-data="imageData" :default-image-data="defaultShroomImage"/>
      </div>
      <div class="col">
        <h1>{{ shroom.shroomName }}</h1>
        <small class="status-label" :class="shroom.status === 'A' ? 'text-success' : 'text-warning'">
          {{ shroom.status === 'A' ? 'active' : 'pending' }}
        </small>
        <div class="row mb-3 justify-content-center">{{ shroom.description }}</div>
        <div v-for="location in locations" key="location.locationId" class="row mb-3">
          <router-link :to="{ path: '/location-info', query: { locationId: location.locationId } }">
            {{ location.locationName }}
          </router-link>
        </div>
        <div class="row justify-content-center mt-3">
          <AlertDanger :message="errorMessage"/>
          <button @click="$router.go(-1)" type="button" class="btn btn-secondary col-3 me-3">Tagasi</button>
          <button v-if="SessionStorageService.isAdmin() || userId === shroom.userId" @click="shroomModalIsOpen=true"
                  type="button" class="btn btn-primary col-3 me-3">Muuda seent
          </button>
          <button v-if="SessionStorageService.isAdmin() " @click="confirmationModalIsOpen=true"
                  type="button" class="btn btn-primary col-3 me-3">Kustuta seen
          </button>
          <ShroomModal :shroomModalIsOpen="shroomModalIsOpen" :shroomId="shroomId"
                       @event-close-modal="shroomModalIsOpen = false"/>
          <DeleteConfirmationModal :confirmationModalIsOpen="confirmationModalIsOpen"
                                   @event-delete="deleteShroom"
                                   @event-close-modal="confirmationModalIsOpen=false" />
        </div>
      </div>
    </div>
    <div class="row">
      <ShowLocationsMap :map-locations="locations"/>
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
import ImageService from "@/services/ImageService";
import LocationService from "@/services/LocationService";
import NavigationService from "@/services/NavigationService";
import ShowLocationsMap from "@/components/map/ShowLocationsMap.vue";
import DeleteConfirmationModal from "@/components/modal/DeleteConfirmationModal.vue";

export default {
  name: 'ShroomInfoView',
  computed: {
    SessionStorageService() {
      return SessionStorageService
    }
  },
  components: {
    DeleteConfirmationModal,
    ShowLocationsMap,
    ShroomModal,
    AlertDanger,
    Image,
  },
  data() {
    return {
      confirmationModalIsOpen: false,
      shroomModalIsOpen: false,
      errorMessage: '',
      defaultShroomImage: defaultShroomImage,
      shroomId: Number(useRoute().query.shroomId),
      userId: Number(sessionStorage.getItem("userId")),

      imageData: '',

      shroom: {
        userId: 0,
        username: '',
        shroomId: 0,
        shroomName: '',
        description: '',
        status: ''
      },

      locations: [
        {
          locationId: 0,
          locationName: '',
          latitude: 0,
          longitude: 0,
          username: '',
          createdAt: '',
          avgRating: 0
        }
      ],


      errorResponse: {
        message: '',
        errorCode: 0,
      }
    }
  },
  methods: {
    deleteShroom(){
      ShroomService.sendDeleteRequest(this.shroomId)
          .then(() => NavigationService.navigateToShroomTable())
          .catch(error => this.handleErrorResponse(error))
    },

    getShroom(shroomId) {
      ShroomService.getShroomDetailedInfo(shroomId)
          .then(response => this.handleGetShroomResponse(response))
          .catch(error => this.handleErrorResponse(error))
      ImageService.getShroomImage(shroomId)
          .then(response => this.imageData = response.data)
          .catch(() => {
          })
      LocationService.getShroomLocations(shroomId)
          .then(response => this.locations = response.data)
          .catch(error => this.handleErrorResponse(error))
    },


    handleErrorResponse(error) {
      this.errorResponse = error.response.data
      this.errorMessage = this.errorResponse.message
    },
    handleGetShroomResponse(response) {
      this.shroom = response.data
      this.hasAccess()
    },
    handleErrorMessage() {
      this.errorMessage = "Ei leitud seent."
      setTimeout(this.resetErrorMessage, 5000)
    },
    resetErrorMessage() {
      this.errorMessage = ''
    },

    hasAccess() {
      if (this.shroom.status === "A" || (this.shroom.status === "P" && (SessionStorageService.isAdmin() || this.userId === this.shroom.userId))) {
      } else {
        NavigationService.navigateToError();
      }
    },

  },

  beforeMount() {
    this.resetErrorMessage()
    if (this.shroomId > 0) {
      this.getShroom(this.shroomId)
    } else {
      this.handleErrorMessage()
    }

  },
}
</script>