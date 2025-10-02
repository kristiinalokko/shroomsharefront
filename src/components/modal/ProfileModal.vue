<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">
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
import ImageInput from "@/components/ImageInput.vue";
import Image from "@/components/Image.vue";
import Modal from "@/components/modal/base/Modal.vue";

export default {
  name: 'ProfileModal',
  components: {Modal, Image, ImageInput},
  props: {
    modalIsOpen: Boolean,

    profile: {
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
  }
}
</script>