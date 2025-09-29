<template>
  <Modal :modal-is-open="addShroomModalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <template #title>
      Lisa uus seen:
    </template>
    <template #body>
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <Image :image-data="shroom.shroomImage" :default-image-data="defaultShroomImage"/>
          </div>
          <div class="col">
            <div class="input-group justify-content-start">
              <div class="row">
                <label>Seene nimi:</label>
                <input v-model="shroom.name" type="text" class="form-control" placeholder="kukeseen">
              </div>
              <div class="row mb-5">
                <label>Kirjeldus:</label>
                <textarea v-model="shroom.description" class="form-control" placeholder="väga hea seen"/>
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
      <button @click="saveShroom" type="button" class="btn btn-outline-success me-3">Salvesta</button>
      <button @click="$emit('event-close-modal')" type="button" class="btn btn-outline-danger">Sulge</button>
    </template>

  </Modal>
</template>

<script>
import defaultShroomImage from '@/assets/shroom.png'
import Modal from "@/components/modal/base/Modal.vue";
import ImageInput from "@/components/ImageInput.vue";
import LocationImage from "@/components/Image.vue";
import Image from "@/components/Image.vue";
import ShroomService from "@/services/ShroomService";

export default {
  name: 'AddShroomModal',
  components: {Image, LocationImage: LocationImage, ImageInput, Modal},
  props: {
    addShroomModalIsOpen: Boolean,
  },
  data() {
    return {
      resetFileInput: false,
      defaultShroomImage: defaultShroomImage,
      inputIsValid: false,
      userId: Number(sessionStorage.getItem("userId")),

      shroom: {
        name: '',
        description: '',
        shroomImage: '',
      },

      errorResponse: {
        message: '',
        errorCode: 0
      },

    }
  },
  methods: {

    handleNewImageSelected(imageData) {
      this.shroom.shroomImage = imageData
    },

    handleResetImageSelectComplete() {
      this.shroomImage = ''
      this.resetFileInput = false
    },


    saveShroom() {
      this.inputIsValid = this.shroom.description.length > 0 && this.shroom.name.length > 0
      if (this.inputIsValid) {
        ShroomService.sendAddShroomRequest(this.userId, this.shroom)
            .then(() => this.handleShroomAdded())
            .catch(error => this.handleErrorResponse(error));
        this.$emit('event-close-modal');
      } else {
        alert("täida väljad")
      }
    },

    handleErrorResponse(error) {
      this.errorResponse = error.response.data
    },

    handleShroomAdded() {
      alert("Seen edukalt lisatud")
    },

  }
}
</script>