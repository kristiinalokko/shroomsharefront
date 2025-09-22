<template>
  <img v-if="imageData === ''" src="../assets/forest.jpg" class="img-thumbnail" alt="Mets">
  <img v-else :src="imageData" class="img-thumbnail" alt="Mets">
</template>

<script>
export default {
  name: 'LocationImage',
  data() {
    return {
      imageData: ''
    }
  },
  methods: {},
  mounted() {
  }
}
</script>

