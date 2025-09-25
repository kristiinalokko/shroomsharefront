<template>
  <div class="home">
    <StarRating/>
  </div>
</template>

<script>
// @ is an alias to /src

import StarRating from "@/components/rating/StarRating.vue";

export default {
  name: 'HomeView',
  components: {
    StarRating
  },
  data() {

  },
  mounted() {
  }
}
</script>
<style>

</style>