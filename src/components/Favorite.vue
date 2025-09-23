<template>
<div>
  <font-awesome-icon v-if="isFavorite" @click="handleDeleteFavorite" icon="fa-solid fa-heart" />
  <font-awesome-icon v-else @click="handleAddFavorite"  icon="fa-regular fa-heart" />
</div>
</template>

<script>
export default {
  name: 'Favorite',
  props: {
    isFavorite: Boolean,
  },
  methods: {

    handleDeleteFavorite() {
      this.$emit("event-delete-favorite")
    },

    handleAddFavorite() {
      this.$emit("event-add-favorite")
    },

  },
}
</script>