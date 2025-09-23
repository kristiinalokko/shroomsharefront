<template>
<div>
  <font-awesome-icon v-if="isFavorite" @click="handleFavoriteClick" icon="fa-solid fa-heart" />
  <font-awesome-icon v-else @click="handleFavoriteClick" icon="fa-light fa-heart-circle-plus" />
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
      this.isFavorite = !this.isFavorite
      this.$emit('event-favorite-changed', this.isFavorite)
    },

  },

}
</script>