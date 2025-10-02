<template>
  <div class="container text-center">
    <h1>Profiil</h1>
    <div class="row">
      <AlertDanger :message="errorResponse.message"/>
      <ProfileModal :modal-is-open="modalIsOpen" :profile="profile"/>
      <div class="col">
        <div class="row">
          <Image :image-data="profile.imageData" :default-image-data="defaultImageData"/>
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
        Nupp: edit (kui on omanik)
        Nupp: tagasi
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


export default {
  name: 'ProfileView',
  components: {ProfileModal, AlertDanger, Image, defaultProfileImage},
  data() {
    return {
      isEdit: false,
      userId: Number(sessionStorage.getItem("userId")),
      defaultImageData: defaultProfileImage,
      modalIsOpen: false,

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
    },

    handleErrorResponse(error) {
      this.errorResponse = error.response.data
      setTimeout(this.resetErrorMessage, 4000)
      // alert(this.errorResponse.message)
    },

    resetErrorMessage() {
      this.errorResponse.message = ''
    },

  },
  mounted() {
    this.getProfile()

  }
}
</script>