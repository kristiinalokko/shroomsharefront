<template>
  <div class="container-fluid">
    <div class="row">
      <h1 class="mb-3">Seene asukohad</h1>
    </div>
    <div class="row">
      <!-- Left Column: Controls -->
      <div class="col-lg-4 col-md-5">
        <div class="controls-panel">
          <MapShroomDropdown
              :selected-shroom="filters.shroomId"
              :placeholder="selectedShroomName"
              @event-new-shroom-selected="setShroomId"
          />
          <!-- Filters Form -->
          <h3>Filtreeri asukohti</h3>
          <form @submit.prevent="applyFilters">
            <div class="mb-2">
              <label for="rating">Minimaalne rating:</label>
              <input
                  v-model.number="filters.minRating"
                  type="number"
                  id="rating"
                  min="0"
                  max="5"
                  step="0.1"
                  class="form-control"
              />
            </div>
            <div class="mb-2">
              <label for="lastActiveAfter">Viimane aktiivsus pärast:</label>
              <input
                  v-model="filters.lastActive"
                  type="date"
                  id="lastActiveAfter"
                  class="form-control"
              />
            </div>
            <div class="mb-2">
              <label for="radius">Otsi kaugusel (km):</label>
              <input
                  v-model.number="filters.radiusKm"
                  type="number"
                  id="radius"
                  class="form-control"
                  min="1"
                  step="1"
              />
            </div>
            <button type="submit" class="btn btn-primary mt-2">Otsi</button>
          </form>
        </div>
      </div>

      <!-- Right Column: Map -->
      <div class="col-lg-8 col-md-7">
        <div class="map-wrapper">
          <l-map
              ref="mapRef"
              :zoom="zoom"
              :center="center"
              :options="mapOptions"
              style="height: 100vh; width: 100%;"
          >
            <l-tile-layer :url="tileUrl" :attribution="attribution"></l-tile-layer>

            <!-- Show message if no locations are available -->
            <div v-if="mapLocations.length === 0">No locations available.</div>

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
                  <div v-if="mapLocation.locationImage">
                    <img :src="mapLocation.locationImage" alt="Location Image" width="100" />
                  </div>
                  <!-- Link to full location info -->
                  <br />
                  <button @click="goToLocationInfoPage(mapLocation)" class="btn btn-primary mt-2">
                    Go to Full Info
                  </button>
                </div>
              </l-popup>
            </l-marker>

            <!-- Draggable red pin for "Minu asukoht" -->
            <l-marker
                v-if="clickPin"
                :lat-lng="[clickPin.latitude, clickPin.longitude]"
                :draggable="true"
                :icon="myLocationIcon"
                @update:lat-lng="onPinDrag"
            >
              <l-tooltip direction="top" :permanent="false">Minu asukoht</l-tooltip>
            </l-marker>
          </l-map>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { LMap, LTileLayer, LMarker, LTooltip, LPopup } from "@vue-leaflet/vue-leaflet";
import { Icon } from "leaflet";
import LocationService from "@/services/LocationService";
import MapShroomDropdown from "@/components/MapShroomDropdown.vue";

export default {
  name: "LocationsView",
  components: { MapShroomDropdown, LMap, LTileLayer, LMarker, LTooltip, LPopup },
  data() {
    return {
      zoom: 7,
      center: [58.7, 25.3], // Estonia center
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "© OpenStreetMap contributors",
      mapOptions: { zoomControl: true, scrollWheelZoom: true },
      mapLocations: [], // List of locations
      filters: {
        shroomId: null,
        minRating: 0,
        lastActive: "",
        latitude: 58.7,
        longitude: 25.3,
        radiusKm: 400,
      },
      clickPin: { latitude: 58.7, longitude: 25.3 },
      selectedShroom: { shroomId: null, shroomName: "Kõik seened" },
      hoveredLocationName: null, // Store hovered location name for tooltip
    };
  },
  computed: {
    selectedShroomName() {
      return this.selectedShroom?.shroomName || "Kõik seened";
    },
    myLocationIcon() {
      return new Icon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
    },
  },
  mounted() {
    this.applyFilters();
  },
  methods: {
    setShroomId(shroomId, shroomObj = null) {
      this.filters.shroomId = shroomId || null;
      this.selectedShroom = shroomObj || { shroomId: null, shroomName: "Kõik seened" };
      this.applyFilters();
    },
    applyFilters() {
      const params = { ...this.filters };
      if (!params.shroomId) {
        delete params.shroomId;
      }
      LocationService.sendGetFilteredMapLocationsRequest(params)
          .then((response) => {
            this.mapLocations = response.data;
          })
          .catch((err) => console.error("Error loading filtered locations:", err));
    },
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
    onPinDrag(newLatLng) {
      this.clickPin.latitude = newLatLng.lat;
      this.clickPin.longitude = newLatLng.lng;
      this.filters.latitude = newLatLng.lat;
      this.filters.longitude = newLatLng.lng;
      this.applyFilters();
    },
  },
};
</script>


