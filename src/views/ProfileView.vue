<template>
  <div class="container text-center">
    <h1>Profiil</h1>
    <div class="row">
      <AlertSuccess :message="successMessage"/>
      <AlertDanger :message="errorResponse.message"/>
      <ProfileModal :modal-is-open="modalIsOpen" :props-profile="profile" :is-edit="isEdit"
                    @event-profile-changed="updateProfile"
                    @event-add-profile="addProfile"
                    @event-close-modal="modalIsOpen=false"
      />
      <div class="col">
        <div class="row">
          <Image :image-data="imageData" :default-image-data="defaultImageData"/>
        </div>
      </div>
      <div class="col ms-5">
        <div class="row">
          Kasutajanimi: {{ profile.username }}
        </div>
        <div class="row">
          Eesnmi: {{ profile.firstName }}
        </div>
        <div class="row">
          Perekonnanimi: {{ profile.lastName }}
        </div>
        <div class="row">
          Kirjeldus: {{ profile.description }}
        </div>
        <div class="row">
          Email: {{ profile.email }}
        </div>
      </div>

    </div>
    <div class="row">
      <div class="col">
      </div>
      <div class="col">
        <button v-if="isEdit" @click="modalIsOpen=true">
          Muuda
        </button>
        <button v-else @click="modalIsOpen=true">
          Lisa enda kohta infot
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileService from "@/services/ProfileService";
import Image from "@/components/Image.vue";
import defaultProfileImage from '@/assets/profile.jpg'
import AlertDanger from "@/components/AlertDanger.vue";
import ProfileModal from "@/components/modal/ProfileModal.vue";
import AlertSuccess from "@/components/AlertSuccess.vue";


export default {
  name: 'ProfileView',
  components: {AlertSuccess, ProfileModal, AlertDanger, Image, defaultProfileImage},
  data() {
    return {
      isEdit: false,
      userId: Number(sessionStorage.getItem("userId")),
      defaultImageData: defaultProfileImage,
      modalIsOpen: false,
      imageData: '',
      successMessage: '',

      profile: {
        profileId: 0,
        userId: 0,
        username: '',
        password: '',
        userStatus: '',
        firstName: '',
        lastName: '',
        email: '',
        description: '',
        imageData: ''
      },

      errorResponse: {
        message: '',
        errorCode: 0
      },

    }
  },
  methods: {

    getProfile() {
      ProfileService.sendGetProfileRequest(this.userId)
          .then(response => this.handleGetProfileResponse(response))
          .catch(error => this.handleErrorResponse(error))
    },

    handleGetProfileResponse(response) {
      this.profile = response.data
      this.imageData = this.profile.imageData
      this.isEdit = true
    },

    handleErrorResponse(error) {
      this.errorResponse = error.response.data
      setTimeout(this.resetErrorMessage, 4000)
      // alert(this.errorResponse.message)
    },

    resetErrorMessage() {
      this.errorResponse.message = ''
    },

    updateProfile(profile) {
      this.profile = profile
      this.imageData = profile.imageData
      this.modalIsOpen = false
      ProfileService.sendPutProfileRequest(this.profile)
          .then(() => this.handlePutResponse)
          .catch(error => this.handleErrorResponse(error))
    },

    addProfile(profile) {
      this.profile = profile
      this.imageData = profile.imageData
      this.modalIsOpen = false
      ProfileService.sendPostProfileRequest(this.profile)
          .then(() => this.handlePostResponse)
          .catch(error => this.handleErrorResponse(error))
    },

    handlePutResponse() {
      this.successMessage = "Profiil edukalt muudetud"
      setTimeout(this.resetSuccessMessage, 4000)
    },

    handlePostResponse() {
      this.successMessage = "Profiil edukalt lisatud"
      setTimeout(this.resetSuccessMessage, 4000)
    },

    resetSuccessMessage() {
      this.successMessage = ''
    },

  },
  mounted() {
    this.getProfile()

  }
}
</script>