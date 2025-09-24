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
            <LocationImage :image-data="comment.imageData" :default-image-data="defaultCommentImage" />
          </div>
          <div class="col">
            <div class="input-group">
              <span class="input-group-text">Lisa oma kommentaar:</span>
              <textarea v-model="comment.body" class="form-control" aria-label="With textarea"></textarea>
              <ImageInput :reset-file-input="resetFileInput"
                          @event-reset-image-select-complete="handleResetImageSelectComplete"
                          @event-new-image-selected="handleNewImageSelected"
              />
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
import LocationLocationImage from "@/components/LocationImage.vue";
import CommentService from "@/services/CommentService";

export default {
  name: 'AddCommentModal',
  components: {LocationImage: LocationLocationImage, ImageInput, Modal},
  props: {
    addCommentModalIsOpen: Boolean,
    locationId: Number,
    userId: Number
  },
  data() {
    return {
      resetFileInput: false,
      defaultCommentImage: defaultCommentImage,

      comment: {
        locationId: this.locationId,
        userId: this.userId,
        body: '',
        imageData: '',
        rating: 0
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

    saveComment() {
      CommentService.postComment(this.comment)
          .then(() => this.handleCommentAdded)
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