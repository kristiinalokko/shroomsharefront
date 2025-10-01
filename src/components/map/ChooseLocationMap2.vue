<template>
  <div>
    <Map>
      <template #insideMap>

        <l-tile-layer :url="tileUrl" :attribution="attribution"></l-tile-layer>

        <l-marker
            v-if="clickPin"
            :lat-lng="[clickPin.latitude, clickPin.longitude]"
            :draggable="true"
            :icon="myLocationIcon"
            @dragend="onPinDrag"
        >
          <l-tooltip direction="top" :permanent="false">Minu asukoht</l-tooltip>
        </l-marker>
      </template>
    </Map>
  </div>

</template>

<script>
import {LMap, LMarker, LPopup, LTileLayer, LTooltip} from "@vue-leaflet/vue-leaflet";
import {Icon} from "leaflet";
import Map from "@/components/Map.vue";

export default {
  name: 'ChooseLocationMap',
  components: {Map, LMap, LTileLayer, LMarker, LTooltip, LPopup},

  props: {
    mapLocations: {
      type: Array,
      default: () => [],
    },

    lat: Number,
    lng: Number,

  },
  data() {
    return {
      zoom: 7,
      center: [58.7, 25.3], // Estonia center
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "© OpenStreetMap contributors",
      mapOptions: {zoomControl: true, scrollWheelZoom: true},
      clickPin: {
        latitude:  0,
        longitude: 0
      },

    }
  },
  methods: {

    onPinDrag(event) {
      const newLatLng = event.target.getLatLng();
      this.clickPin.latitude = newLatLng.lat;
      this.clickPin.longitude = newLatLng.lng;
      this.$emit('event-new-location-selected', newLatLng)
    },

  },
  watch: {
    lat(newLat) {
      this.clickPin.latitude = newLat || 58.7; // Provide default value if undefined
    },
    lng(newLng) {
      this.clickPin.longitude = newLng || 25.3; // Provide default value if undefined
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
    this.clickPin.latitude = this.lat || 58.7
    this.clickPin.longitude = this.lng || 25.3
  }
}
</script>