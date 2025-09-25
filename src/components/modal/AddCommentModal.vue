<template>
  <Modal :modal-is-open="addCommentModalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <template #title>
      Lisa uus kommentaar:
    </template>

    <template #body>
      <!--      grid pilt ja body-->
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <Image :image-data="comment.imageData" :default-image-data="defaultCommentImage" />
          </div>
          <div class="col">
            <div class="input-group justify-content-start">
              <span class="input-group-text">Lisa oma kommentaar:</span>
              <textarea v-model="comment.body" class="form-control mb-3" aria-label="With textarea"></textarea>
              <ImageInput :reset-file-input="resetFileInput"
                          @event-reset-image-select-complete="handleResetImageSelectComplete"
                          @event-new-image-selected="handleNewImageSelected"
              />
              Anna oma hinnang viie palli süsteemis:
              <input v-model.number="comment.rating" min="1" max="5" type="number" class="form-control" placeholder="">
            </div>
          </div>
        </div>
      </div>

    </template>

    <template #buttons>
      <button @click="saveComment" type="button" class="btn btn-outline-success me-3" >Salvesta</button>
      <button @click="$emit('event-close-modal')" type="button" class="btn btn-outline-danger">Sulge</button>
    </template>

  </Modal>
</template>

<script>
import defaultCommentImage from '@/assets/comment.png'
import Modal from "@/components/modal/base/Modal.vue";
import ImageInput from "@/components/ImageInput.vue";
import LocationImage from "@/components/Image.vue";
import CommentService from "@/services/CommentService";
import Image from "@/components/Image.vue";

export default {
  name: 'AddCommentModal',
  components: {Image, LocationImage: LocationImage, ImageInput, Modal},
  props: {
    addCommentModalIsOpen: Boolean,
    locationId: Number
  },
  data() {
    return {
      resetFileInput: false,
      defaultCommentImage: defaultCommentImage,

      comment: {
        locationId: this.locationId,
        userId: Number(sessionStorage.getItem("userId")),
        body: '',
        imageData: '',
        rating: 1
      },

      errorResponse: {
        message: '',
        errorCode: 0
      },

    }
  },
  methods: {

    handleNewImageSelected(imageData) {
      this.comment.imageData = imageData
    },

    handleResetImageSelectComplete() {
      this.comment.imageData = ''
      this.resetFileInput = false
    },

    //tuleks mõelda läbi check, et kõik vajalikud väljad on olemas
    saveComment() {
      CommentService.postComment(this.comment)
          .then(() => this.handleCommentAdded())
          .catch(error=> this.handleErrorResponse(error))
      this.$emit('event-close-modal')
    },

    handleErrorResponse(error) {
      this.errorResponse = error.response.data
    },

    handleCommentAdded() {
      this.$emit('event-new-comment-added', this.comment)
    },

  }
}
</script>