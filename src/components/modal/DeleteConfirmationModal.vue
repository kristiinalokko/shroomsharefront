<template>
  <Modal :modal-is-open="confirmationModalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <template #title>
      <h1>Kustuta</h1>
    </template>
    <template #body>
      <div class="container text-center">
        <div class="row">
          <p>Kas oled kindel, et soovid kustutada? Seda tegevust ei saa tagasi võtta.</p>
        </div>
      </div>
    </template>
    <template #buttons>
      <button @click="$emit('event-delete')" type="button" class="btn btn-outline-success me-3">Kustuta</button>
      <button @click="$emit('event-close-modal')" type="button" class="btn btn-outline-danger">Sulge</button>
    </template>
  </Modal>
</template>

<script>
import Image from "@/components/Image.vue";
import ImageInput from "@/components/ImageInput.vue";
import Modal from "@/components/modal/base/Modal.vue";

export default {
  name: 'DeleteConfirmationModal',
  components: {Modal, ImageInput, Image},
  props:{
    confirmationModalIsOpen: Boolean
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {
  }
}
</script>