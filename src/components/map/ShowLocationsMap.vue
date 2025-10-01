<template>
  <div>
    <MapBase>
      <template #insideMap>

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
              <strong>{{ mapLocation.locationName }}</strong><br/>
              <strong>Username:</strong> {{ mapLocation.username }}<br/>
              <strong>Rating:</strong> {{ mapLocation.avgRating }}<br/>
              <strong>Added:</strong> {{ mapLocation.createdAt }}<br/>
              <strong>Description:</strong> {{ mapLocation.description }}<br/>
              <br/>
              <button @click="goToLocationInfoPage(mapLocation)" class="btn btn-primary mt-2">
                Go to Full Info
              </button>
            </div>
          </l-popup>
        </l-marker>
      </template>
    </MapBase>
  </div>

</template>

<script>
import {LMap, LMarker, LPopup, LTileLayer, LTooltip} from "@vue-leaflet/vue-leaflet";
import MapBase from "@/components/map/base/MapBase.vue";

export default {
  name: 'ShowLocationsMap',
  components: {MapBase, LMap, LTileLayer, LMarker, LTooltip, LPopup},

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
      mapOptions: {zoomControl: true, scrollWheelZoom: true},

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
        query: {locationId: mapLocation.locationId},
      });
    },
  },
  mounted() {
  }
}
</script>