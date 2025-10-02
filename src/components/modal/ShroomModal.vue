<template>
  <Modal :modal-is-open="shroomModalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <template #title>
      <span v-if="isEdit">Uuenda seent:</span>
      <span v-else>Lisa uus seen:</span>
      <AlertDanger :message="alertMessage"/>
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
      <button v-if="this.isEdit" @click="updateShroom" type="button" class="btn btn-outline-success me-3">Uuenda
      </button>
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
import AlertDanger from "@/components/AlertDanger.vue";

export default {
  name: 'ShroomModal',
  components: {AlertDanger, Image, LocationImage: LocationImage, ImageInput, Modal},
  props: {
    shroomModalIsOpen: Boolean,
    shroomId: Number,
  },
  watch: {
    shroomModalIsOpen(newVal, oldVal) {
      if (newVal && !oldVal) { // Only when opening
        this.onModalOpen();
      }
    },
  },
  computed: {
    isEdit() {
      return this.shroomId > 0
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

      alertMessage: ''

    }
  },
  methods: {

    handleNewImageSelected(imageData) {
      this.imageData = typeof imageData === 'object' && imageData.imageData ? imageData.imageData : imageData;
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
        this.handleAlertDanger("Täida kõik väljad")
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
        this.handleAlertDanger("Täida kõik väljad")
      }
    },

    handleErrorResponse(error) {
      this.errorResponse = error.response.data
    },

    handleShroomAdded() {
      this.$emit('event-close-modal');
    },

    handleShroomUpdated() {
      this.$emit('event-close-modal');
    },

    handleAlertDanger(message) {
      this.alertMessage = message
      setTimeout(this.resetAlert, 4000)
    },

    resetAlert(){
      this.alertMessage = ''
    },

    onModalOpen() {
      if (this.isEdit) {
        ShroomService.getShroomDetailedInfo(this.shroomId)
            .then(response => this.shroom = response.data)
            .catch(error => this.handleErrorResponse(error))
        ImageService.getShroomImage(this.shroomId)
            .then(response => this.imageData = response.data.imageData)
            .catch(() => {
            })
      } else {
        this.shroom = {
          userId: 0,
          shroomId: 0,
          shroomName: '',
          description: '',
          status: ''
        };
        this.imageData = '';
        this.resetFileInput = true
      }
    }
  },
}
</script>