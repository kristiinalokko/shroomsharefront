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

<!--        &lt;!&ndash; Show message if no locations are available &ndash;&gt;-->
<!--        <div v-if="mapLocations.length === 0">No locations available.</div>-->

        <!--         Draggable red pin for "Minu asukoht" -->
        <l-marker
            v-if="clickPin"
            :lat-lng="[clickPin.latitude, clickPin.longitude]"
            :draggable="true"
            :icon="myLocationIcon"
            @dragend="onPinDrag"
        >
          <l-tooltip direction="top" :permanent="false">Minu asukoht</l-tooltip>
        </l-marker>
      </l-map>
    </div>
  </div>

</template>

<script>
import {LMap, LMarker, LPopup, LTileLayer, LTooltip} from "@vue-leaflet/vue-leaflet";
import {Icon} from "leaflet";

export default {
  name: 'ChooseLocationMap',
  components: {LMap, LTileLayer, LMarker, LTooltip, LPopup},

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
      clickPin: { latitude: 58.7, longitude: 25.3 },

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

    onMapReady(event) {
      console.log('Map is ready:', event);
      // Perform any map-related actions here, using the map instance
    },

    onPinDrag(event) {
      const newLatLng = event.target.getLatLng();
      this.clickPin.latitude = newLatLng.lat;
      this.clickPin.longitude = newLatLng.lng;
      this.$emit('event-new-location-selected', newLatLng)
    },
  },
  computed: {

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
  }
}
</script>