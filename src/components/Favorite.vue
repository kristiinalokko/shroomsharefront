<template>
  <div>
    <font-awesome-icon v-if="isFavorite" @click="handleDeleteFavorite" icon="fa-solid fa-heart" class="fa-3x"/>
    <font-awesome-icon v-else @click="handleAddFavorite" icon="fa-regular fa-heart" class="fa-3x"/>
  </div>
</template>

<script>
export default {
  name: 'Favorite',
  props: {
    isFavorite: Boolean,
    userId: Number,
    locationId: Number
  },
  methods: {

    handleDeleteFavorite() {
      this.$emit("event-delete-favorite",
          {
            userId: this.userId,
            locationId: this.locationId
          })
    },

    handleAddFavorite() {
      this.$emit("event-add-favorite",
          {
            userId: this.userId,
            locationId: this.locationId
          })
    },

  },
}
</script>