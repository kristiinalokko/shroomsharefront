<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <template #title>
      <span v-if="isEdit">Uuenda profiili:</span>
      <span v-else>Lisa enda profiil:</span>
    </template>
    <template #body>
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <Image :image-data="imageData" :default-image-data="defaultProfileImage"/>
          </div>
          <div class="col">
            <div class="input-group justify-content-start">

              <div class="row">
                <label>Eesnimi:</label>
                <input v-model="profile.firstName" type="text" class="form-control" placeholder="Eesnimi">
              </div>
              <div class="row">
                <label>Perekonnanimi:</label>
                <input v-model="profile.lastName" type="text" class="form-control" placeholder="Perekonnanimi">
              </div>
              <div class="row mb-5">
                <label>Kirjeldus:</label>
                <textarea v-model="profile.description" class="form-control" placeholder="Olen ilus"/>
              </div>
              <div class="row mb-5">
                <label>Email:</label>
                <textarea v-model="profile.email" class="form-control" placeholder="kasutaja@mail.ee"/>
              </div>
              <div class="row">
                <label>Lisa pilt:</label>
                <ImageInput :reset-file-input="resetFileInput"
                            @event-reset-image-select-complete="handleResetImageSelectComplete"
                            @event-new-image-selected="handleNewImageSelected"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </template>

    <template #buttons>
      <button v-if="isEdit" @click="emitUpdatedProfile" type="button"
              class="btn btn-outline-success me-3">Uuenda
      </button>
      <button v-else @click="$emit('event-add-profile', profile)" type="button" class="btn btn-outline-success me-3">
        Lisa
      </button>
      <button @click="$emit('event-close-modal')" type="button" class="btn btn-outline-danger">Sulge</button>
    </template>

  </Modal>
</template>

<script>
import ImageInput from "@/components/ImageInput.vue";
import Image from "@/components/Image.vue";
import Modal from "@/components/modal/base/Modal.vue";
import defaultProfileImage from '@/assets/profile.jpg'


export default {
  name: 'ProfileModal',
  components: {Modal, Image, ImageInput, defaultProfileImage},
  props: {
    modalIsOpen: Boolean,
    isEdit: Boolean,

    propsProfile: {
      profileId: Number,
      userId: Number,
      username: String,
      password: String,
      userStatus: String,
      firstName: String,
      lastName: String,
      email: String,
      description: String,
      imageData: String
    },
  },

  data() {
    return {
      defaultProfileImage: defaultProfileImage,
      resetFileInput: false,
      imageData: '',

      profile: this.propsProfile,
    }
  },
  watch: {
    // Sync data when propsProfile changes
    propsProfile: {
      deep: true,
      handler(newProfile) {
        this.profile = { ...newProfile }; // Update profile when prop changes
        this.imageData = newProfile.imageData; // Sync imageData
      },
    },
  },
  methods: {

    handleResetImageSelectComplete() {
      // this.profile.imageData = ''
      this.resetFileInput = false
    },

    handleNewImageSelected(imageData) {
      this.profile.imageData = imageData;
      this.imageData = imageData
    },

    emitUpdatedProfile() {
      this.$emit("event-profile-changed", this.profile);
    },
  },


}
</script>