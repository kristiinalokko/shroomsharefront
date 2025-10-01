<template>
  <div class="col-lg-8 col-md-7">
    <div class="map-wrapper">
      <l-map
          ref="mapRef"
          :zoom="zoom"
          :center="center"
          @ready="onMapReady"
          :options="mapOptions"
          style="height: 100vh; width: 100%;"
      >
        <l-tile-layer :url="tileUrl" :attribution="attribution"></l-tile-layer>

        <!-- Show message if no locations are available -->
<!--        <div v-if="mapLocations.length === 0">No locations available.</div>-->

        <!-- Shroom location markers -->
        <l-marker
            v-for="mapLocation in mapLocations"
            :key="mapLocation.locationId"
            :lat-lng="[mapLocation.latitude, mapLocation.longitude]"
            @mouseover="showLocationName(mapLocation)"
            @click="showPopup(mapLocation)"
        >
          <l-tooltip>{{ mapLocation.locationName }}</l-tooltip>
          <l-popup>
            <div>
              <strong>{{ mapLocation.locationName }}</strong><br />
              <strong>Username:</strong> {{ mapLocation.username }}<br />
              <strong>Rating:</strong> {{ mapLocation.avgRating }}<br />
              <strong>Added:</strong> {{ mapLocation.createdAt }}<br />
              <strong>Description:</strong> {{ mapLocation.description }}<br />
              <!--              <div v-if="mapLocation.locationImage">-->
              <!--                <img :src="mapLocation.locationImage" alt="Location Image" width="100" />-->
              <!--              </div>-->
              <!-- Link to full location info -->
              <br />
              <button @click="goToLocationInfoPage(mapLocation)" class="btn btn-primary mt-2">
                Go to Full Info
              </button>
            </div>
          </l-popup>
        </l-marker>

      </l-map>
    </div>
  </div>

</template>

<script>
import {LMap, LMarker, LPopup, LTileLayer, LTooltip} from "@vue-leaflet/vue-leaflet";

export default {
  name: 'ShowLocationsMap',
  components: {LMap, LTileLayer, LMarker, LTooltip, LPopup },

  props: {
    mapLocations: {
      type: Array,
      default: () => [], // Ensure a default value to avoid undefined
    },

  },
  data() {
    return {
      zoom: 7,
      center: [58.7, 25.3], // Estonia center
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "© OpenStreetMap contributors",
      mapOptions: { zoomControl: true, scrollWheelZoom: true },

    }
  },
  methods: {

    showLocationName(mapLocation) {
      this.hoveredLocationName = mapLocation.locationName; // Show location name on hover
    },
    showPopup(mapLocation) {
      this.selectedLocation = mapLocation; // Store selected location data for popup
    },
    goToLocationInfoPage(mapLocation) {
      // Navigate to the full location info page
      this.$router.push({
        path: "/location-info",
        query: { locationId: mapLocation.locationId },
      });
    },
    onMapReady(event) {
      console.log('Map is ready:', event);
      // Perform any map-related actions here, using the map instance
    },
  },
  mounted() {
  }
}
</script>