<template>
  <div class="home">
    <h1>Siia tuleb õige avaleht: kaart ja filtrid (hetkel Locations leht)</h1>
    <p>Hetkel näitab siin kõiki asukohti nimekirjana:</p>
    <div v-for="location in locations" class="row mb-3">
      <router-link :to="{ path: '/location-info', query: { locationId: location.locationId } }">
        {{ location.locationName }}
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import StarRating from "@/components/rating/StarRating.vue";
import LocationService from "@/services/LocationService";

export default {
  name: 'HomeView',
  components: {
    StarRating
  },
  data() {
    return {
      locations: [
        {
          locationId: 0,
          locationName: '',
          latitude: 0,
          longitude: 0,
          username: '',
          createdAt: '',
          avgRating: 0
        },
      ]
    }
  },
  methods: {

    getAllLocations()
    {
      LocationService.sendGetMapLocationsAllRequest()
          .then(response => this.locations = response.data)
          .catch(error => alert(error.response.data))
    }

  },
  mounted() {
    this.getAllLocations()
  }
}
</script>
<style>

</style>