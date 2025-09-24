<template>
  <img v-if="imageData === ''" :src="defaultImageData" class="img-thumbnail" alt="Default pilt">
  <img v-else :src="imageData" class="img-thumbnail" alt="Pilt">
</template>

<script>
export default {
  name: 'Image',
  props:{
    imageData: String,
    defaultImageData: String
  },
  methods: {},
  mounted() {
  }
}
</script>

