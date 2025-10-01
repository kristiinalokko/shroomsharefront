<template>
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

        <slot name="insideMap"></slot>

      </l-map>
    </div>
  </div>

</template>

<script>
import {LMap, LMarker, LPopup, LTileLayer, LTooltip} from "@vue-leaflet/vue-leaflet";

export default {
  name: 'MapBase',
  components: {LMap, LTileLayer, LMarker, LTooltip, LPopup},
  data() {
    return {
      zoom: 7,
      center: [58.7, 25.3], // Estonia center
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "© OpenStreetMap contributors",
      mapOptions: {zoomControl: true, scrollWheelZoom: true},
    }
  },
  methods: {},
  mounted() {
  }
}
</script>