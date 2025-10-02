<template>
  <div class="map-container">
    <l-map
        ref="mapRef"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        class="map-square"
        @ready="onMapReady"
    >
      <l-tile-layer :url="tileUrl" :attribution="attribution"></l-tile-layer>
      <l-marker
          v-for="mapLocation in mapLocations"
          :key="mapLocation.locationId"
          :lat-lng="[mapLocation.latitude, mapLocation.longitude]"
          :icon="blueShroomIcon"
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
    </l-map>
  </div>
</template>

<script>
import { LMap, LMarker, LPopup, LTileLayer, LTooltip } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";
import { latLngBounds } from "leaflet";

export default {
  name: 'ShowLocationsMap',
  components: { LMap, LTileLayer, LMarker, LTooltip, LPopup },
  props: {
    mapLocations: {
      type: Array,
      default: () => [], // Ensure a default value to avoid undefined
    },
  },
  data() {
    return {
      zoom: 6,
      center: [58.7, 25.3], // Estonia center
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "© OpenStreetMap contributors",
      mapOptions: { zoomControl: true, scrollWheelZoom: true },
      mapObject: null,
      mapReady: false,
    };
  },
  computed: {
    blueShroomIcon() {
      return L.icon({
        iconUrl: require('@/assets/blueshroompin.png'),
        iconSize: [25, 41], // Adjust size as needed
        iconAnchor: [19, 38], // Anchor point (center bottom of the icon)
        popupAnchor: [0, -38], // Popup position relative to icon
      });
    },
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
    onMapReady(mapInstance) {
      this.mapObject = mapInstance;
      this.mapReady = true;
      this.adjustMapZoom();
    },
    adjustMapZoom() {
      if (!this.mapObject || !this.mapReady) return;

      try {
        const allCoords = this.mapLocations.map(loc => [loc.latitude, loc.longitude]);

        // Use setTimeout to ensure map container is fully rendered
        setTimeout(() => {
          if (!this.mapObject || !this.mapObject._loaded) return;

          // Check if map container exists
          const container = this.mapObject.getContainer();
          if (!container || container.offsetWidth === 0) {
            console.warn('Map container not ready yet');
            return;
          }

          try {
            if (allCoords.length === 0) {
              // No locations, set to default Estonia view
              this.mapObject.setView([58.7, 25.3], 7);
            } else {
              const bounds = latLngBounds(allCoords);
              this.mapObject.fitBounds(bounds, { padding: [50, 50] });
            }
          } catch (innerError) {
            console.error('Error in fitBounds/setView:', innerError);
          }
        }, 200);
      } catch (error) {
        console.error('Error adjusting map zoom:', error);
      }
    },
  },
  watch: {
    mapLocations: {
      handler() {
        // Adjust zoom whenever mapLocations change
        this.$nextTick(() => {
          this.adjustMapZoom();
        });
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  padding-bottom: 50%; /* Creates a 2:1 aspect ratio (height is half the width) */
  position: relative;
}

.map-square {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>