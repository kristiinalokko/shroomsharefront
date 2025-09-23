<template>
<div>
  <font-awesome-icon v-if="isFavorite" @click="handleFavoriteClick" icon="fa-solid fa-heart" />
  <font-awesome-icon v-else @click="handleFavoriteClick"  icon="fa-regular fa-heart-cdfgircle-plus" />
  scfg
  <FontAwesomeIcon icon="fa-light fa-heart-circle-plus" />cb
</div>
</template>

<script>
export default {
  name: 'Favorite',
  props: {
    isFavorite: Boolean,
  },
  methods: {

    handleFavoriteClick() {
      this.$emit('event-favorite-changed', !this.isFavorite)
    },

  },
}
</script>