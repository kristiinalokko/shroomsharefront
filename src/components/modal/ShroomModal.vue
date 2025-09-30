<template>
  <Modal :modal-is-open="shroomModalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <template #title>
      <span v-if="isEdit" >Uuenda seent:</span>
      <span v-else >Lisa uus seen:</span>
    </template>
    <template #body>
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <Image :image-data="imageData" :default-image-data="defaultShroomImage"/>
          </div>
          <div class="col">
            <div class="input-group justify-content-start">
              <div class="row">
                <label>Seene nimi:</label>
                <input v-model="shroom.shroomName" type="text" class="form-control" placeholder="kukeseen">
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
      <button v-if="this.isEdit" @click="updateShroom" type="button" class="btn btn-outline-success me-3">Uuenda</button>
      <button v-else @click="addShroom" type="button" class="btn btn-outline-success me-3">Lisa</button>
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
import ImageService from "@/services/ImageService";

export default {
  name: 'ShroomModal',
  components: {Image, LocationImage: LocationImage, ImageInput, Modal},
  props: {
    shroomModalIsOpen: Boolean,
    shroomId: Number,
  },
  watch: {
    shroomModalIsOpen(newVal) {
      if (newVal) {
        this.onModalOpen();
      }
    },
  },
  data() {
    return {
      resetFileInput: false,
      defaultShroomImage: defaultShroomImage,
      inputIsValid: false,
      userId: Number(sessionStorage.getItem("userId")),
      imageData: '',

      shroom: {
        userId: 0,
        shroomId: 0,
        shroomName: '',
        description: '',
        status: ''
      },

      errorResponse: {
        message: '',
        errorCode: 0
      },

    }
  },
  methods: {

    handleNewImageSelected(imageData) {
      this.imageData = imageData
    },

    handleResetImageSelectComplete() {
      this.imageData = ''
      this.resetFileInput = false
    },


    shroomData() {
      return {
        name: this.shroom.shroomName,
        description: this.shroom.description,
        shroomImage: this.imageData
      };
    },

    addShroom() {
      this.inputIsValid = this.shroom.description.length > 0 && this.shroom.shroomName.length > 0
      if (this.inputIsValid) {
        let shroomData = this.shroomData();
        ShroomService.sendAddShroomRequest(this.userId, shroomData)
            .then(() => this.handleShroomAdded())
            .catch(error => this.handleErrorResponse(error));
      } else {
        alert("täida väljad")
      }
    },

    updateShroom() {
      this.inputIsValid = this.shroom.description.length > 0 && this.shroom.shroomName.length > 0
      if (this.inputIsValid) {
        let shroomData = this.shroomData();
        ShroomService.sendUpdateShroomRequest(this.shroomId, shroomData)
            .then(() => this.handleShroomUpdated())
            .catch(error => this.handleErrorResponse(error));
      } else {
        alert("täida väljad")
      }
    },

    handleErrorResponse(error) {
      this.errorResponse = error.response.data
    },

    handleShroomAdded() {
      alert("Seen edukalt lisatud")
      this.$emit('event-close-modal');
    },

    handleShroomUpdated() {
      alert("Seen edukalt uuendatud")
      this.$emit('event-close-modal');
    },

    isEdit(){
      return this.shroomId > 0
    },

    onModalOpen() {
      if (this.isEdit) {
        ShroomService.getShroomDetailedInfo(this.shroomId)
            .then(response => this.shroom = response.data)
            .catch(error => this.handleErrorResponse(error))
        ImageService.getShroomImage(this.shroomId)
            .then(response => this.imageData = response.data)
            .catch(() => {
            })
      }
    }
  },
}
</script>