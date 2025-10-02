<template>
  <div class="nineties-page">
    <center>
      <h1 class="nineties-title">
        <blink>🍄 WELCOME TO THE ULTIMATE MUSHROOM DATABASE! 🍄</blink>
      </h1>
      <marquee behavior="scroll" direction="left" class="subtitle-marquee">
        ★ Find the COOLEST mushrooms in your area! ★ Share your discoveries! ★ Join the fungus revolution! ★
      </marquee>
    </center>

    <!-- 90s Alert Messages -->
    <center v-if="errorMessage">
      <table border="3" cellpadding="10" bgcolor="#FF0000" class="alert-table">
        <tr>
          <td align="center">
            <font color="#FFFFFF" size="4"><b>⚠️ ERROR ALERT! ⚠️</b></font><br>
            <font color="#FFFF00" size="3">{{ errorMessage }}</font>
          </td>
        </tr>
      </table>
    </center>

    <center v-if="successMessage">
      <table border="3" cellpadding="10" bgcolor="#00FF00" class="alert-table">
        <tr>
          <td align="center">
            <font color="#FF0000" size="4"><b>🎉 SUCCESS! 🎉</b></font><br>
            <font color="#0000FF" size="3">{{ successMessage }}</font>
          </td>
        </tr>
      </table>
    </center>

    <!-- Main Content in 90s Table Layout -->
    <table width="100%" border="5" cellpadding="15" cellspacing="5" bgcolor="#FFFF99" class="main-table">
      <tr>
        <td width="20%" bgcolor="#FF69B4" valign="top">
          <center>
            <h3 class="sidebar-title">🌟 SITE INFO 🌟</h3>
            <p class="sidebar-text">
              <blink>NEW!</blink> Upload your mushroom pics!<br><br>
              💯 Over 1337 mushrooms catalogued!<br><br>
              🔥 Hot locations updated daily!<br><br>
              ⭐ Join our growing community!
            </p>
            <img src="@/assets/shroom.png" width="80" height="80" alt="Cool Shroom" class="spinning-image">
          </center>
        </td>
        <td bgcolor="#FFFFFF" class="main-content">
          <!-- 90s Map Section -->
          <center>
            <h2 class="content-title">🗺️ FIND MUSHROOMS ON OUR INTERACTIVE MAP! 🗺️</h2>
            <table border="2" bgcolor="#FFFFCC" cellpadding="10" width="100%">
              <tr>
                <td align="center">
                  <font color="#FF0000" size="3"><b>Choose your favorite shroom type:</b></font><br>
                  <MapShroomDropdown @event-new-shroom-selected="setShroomId" />
                  <br><br>
                  <button @click="shareMyLocation" class="nineties-map-button">📍 USE MY LOCATION! 📍</button>
                </td>
              </tr>
            </table>

            <!-- The Map -->
            <div class="map-container">
              <LMap
                v-model:zoom="zoom"
                v-model:center="center"
                :options="mapOptions"
                @ready="onMapReady"
                style="height: 400px; width: 100%; border: 5px ridge #000000;"
              >
                <LTileLayer :url="tileUrl" :attribution="attribution" />

                <!-- Red draggable pin -->
                <LMarker
                  :lat-lng="[clickPin.latitude, clickPin.longitude]"
                  :icon="myLocationIcon"
                  :draggable="true"
                  @moveend="onPinDrag"
                >
                  <LTooltip>📍 Your Search Center</LTooltip>
                </LMarker>

                <!-- Blue mushroom pins -->
                <LMarker
                  v-for="mapLocation in mapLocations"
                  :key="mapLocation.locationId"
                  :lat-lng="[mapLocation.latitude, mapLocation.longitude]"
                  :icon="blueShroomIcon"
                  @click="showPopup(mapLocation)"
                >
                  <LPopup>
                    <div class="popup-content">
                      <h4>{{ mapLocation.locationName }}</h4>
                      <StarRating :rating="mapLocation.averageRating" />
                      <div v-for="shroom in mapLocation.shrooms" :key="shroom.shroomId">
                        🍄 {{ shroom.shroomName }}
                      </div>
                      <button @click="goToLocationInfoPage(mapLocation)" class="popup-button">
                        VIEW DETAILS
                      </button>
                    </div>
                  </LPopup>
                </LMarker>
              </LMap>
            </div>
          </center>
        </td>
        <td width="20%" bgcolor="#00FFFF" valign="top">
          <center>
            <h3 class="sidebar-title">🎵 COOL LINKS 🎵</h3>
            <p class="sidebar-text">
              <a href="#" class="nineties-sidebar-link">🍄 Mushroom Facts</a><br><br>
              <a href="#" class="nineties-sidebar-link">📧 Email Webmaster</a><br><br>
              <a href="#" class="nineties-sidebar-link">💾 Download Screensaver</a><br><br>
              <a href="#" class="nineties-sidebar-link">🎮 Mushroom Game</a>
            </p>
            <marquee direction="up" height="100px" class="vertical-marquee">
              ⭐ Best viewed at 800x600! ⭐ Requires Internet Explorer 4.0! ⭐
            </marquee>
          </center>
        </td>
      </tr>
    </table>

    <!-- Guest Book Section -->
    <center>
      <table border="4" cellpadding="10" bgcolor="#FFD700" class="guestbook-table">
        <tr bgcolor="#FF4500">
          <td align="center">
            <font color="#FFFFFF" size="5"><b>📝 SIGN OUR GUEST BOOK! 📝</b></font>
          </td>
        </tr>
        <tr>
          <td align="center">
            <font color="#800080" size="3">
              <b>Leave a message for other mushroom enthusiasts!</b><br>
              Tell us about your favorite fungi discoveries!
            </font>
          </td>
        </tr>
      </table>
    </center>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LTooltip, LPopup } from "@vue-leaflet/vue-leaflet";
import { Icon, latLngBounds } from "leaflet";
import LocationService from "@/services/LocationService";
import MapShroomDropdown from "@/components/MapShroomDropdown.vue";
import StarRating from "@/components/rating/StarRating.vue";
import ShroomService from "@/services/ShroomService";
export default {
  name: "LocationsView",
  components: { StarRating, MapShroomDropdown, LMap, LTileLayer, LMarker, LTooltip, LPopup },
  data() {
    return {
      zoom: 7,
      center: [58.7, 25.3],
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "© OpenStreetMap contributors",
      mapOptions: { zoomControl: true, scrollWheelZoom: true },
      mapLocations: [],
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
      selectedLocation: null,
      mapObject: null,
      mapReady: false
    };
  },
  computed: {
    selectedShroomName() {
      return this.selectedShroom?.shroomName || "Kõik seened";
    },
    myLocationIcon() {
      return new Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
    },
    blueShroomIcon() {
      return new Icon({
        iconUrl: require('@/assets/blueshroompin.png'),
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
    },
  },
  mounted() {
    // Don't call applyFilters here - wait for map to be ready
  },
  methods: {
    onMapReady(mapInstance) {
      this.mapObject = mapInstance;
      this.mapReady = true;
      // Load initial data after map is ready
      this.applyFilters();
    },
    setShroomId(shroomId, shroomObj = null) {
      this.filters.shroomId = shroomId || null;
      this.selectedShroom = shroomObj || { shroomId: null, shroomName: "Kõik seened" };
      this.applyFilters();
    },
    async applyFilters() {
      const params = {
        latitude: this.filters.latitude,
        longitude: this.filters.longitude,
        radiusKm: this.filters.radiusKm,
        minRating: this.filters.minRating || 0,
        lastActive: this.filters.lastActive || '',
      };
      if (this.filters.shroomId) params.shroomId = this.filters.shroomId;

      try {
        const response = await LocationService.sendGetFilteredMapLocationsRequest(params);
        this.mapLocations = response.data.map(loc => ({ ...loc, shrooms: [] }));

        for (const loc of this.mapLocations) {
          try {
            const shroomRes = await ShroomService.getShroomsByLocationId(loc.locationId);
            loc.shrooms = shroomRes.data;
          } catch (e) {
            loc.shrooms = [];
          }
        }

        // Wait for DOM updates and map to be ready
        await this.$nextTick();

        // Only adjust zoom if map is loaded and container is valid
        if (this.mapReady && this.mapObject && this.mapObject._loaded) {
          this.adjustMapZoom();
        }

      } catch (err) {
        console.error("Error loading filtered locations:", err);
      }
    },
    goToLocationInfoPage(mapLocation) {
      this.$router.push({ path: "/location-info", query: { locationId: mapLocation.locationId } });
    },
    onPinDrag(newLatLng) {
      this.clickPin.latitude = newLatLng.lat;
      this.clickPin.longitude = newLatLng.lng;
      this.filters.latitude = newLatLng.lat;
      this.filters.longitude = newLatLng.lng;
      this.applyFilters();
    },
    showPopup(mapLocation) {
      this.selectedLocation = mapLocation;
    },
    shareMyLocation() {
      if (!navigator.geolocation) {
        alert("Geolokatsiooni ei toetata.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            this.clickPin.latitude = lat;
            this.clickPin.longitude = lng;
            this.filters.latitude = lat;
            this.filters.longitude = lng;

            this.applyFilters();
          },
          (error) => {
            alert("Asukoha saamine ebaõnnestus: " + error.message);
          }
      );
    },
    adjustMapZoom() {
      if (!this.mapObject || !this.mapReady) return;

      try {
        const allCoords = this.mapLocations.map(loc => [loc.latitude, loc.longitude]);
        if (this.clickPin) allCoords.push([this.clickPin.latitude, this.clickPin.longitude]);

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
            if (allCoords.length === 1 && this.clickPin) {
              // Only red pin → show full Estonia map
              this.mapObject.setView([58.7, 25.3], 7);
              alert('Seeni ei leitud!');
            } else if (allCoords.length > 0) {
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
    }
  }
};
</script>

<style scoped>
.nineties-page {
  background: repeating-linear-gradient(
    45deg,
    #FFE4E1,
    #FFE4E1 10px,
    #E6E6FA 10px,
    #E6E6FA 20px
  );
  min-height: 100vh;
  padding: 20px;
}

.nineties-title {
  font-size: 36px;
  color: #FF0000;
  text-shadow: 3px 3px 0px #00FF00, 6px 6px 0px #0000FF;
  font-weight: bold;
  margin: 20px 0;
  text-decoration: underline;
}

.subtitle-marquee {
  font-size: 18px;
  color: #800080;
  font-weight: bold;
  background: linear-gradient(90deg, #FFFF00, #FF69B4, #00FFFF);
  padding: 10px;
  border: 3px solid #000000;
  margin: 10px 0;
}

.alert-table {
  margin: 15px 0;
  animation: alertPulse 1s ease infinite;
}

@keyframes alertPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.main-table {
  box-shadow: 10px 10px 20px #000000;
  border-collapse: separate;
  border-spacing: 5px;
}

.sidebar-title {
  color: #000080;
  font-size: 16px;
  text-decoration: underline;
  text-shadow: 2px 2px 4px #FFFFFF;
}

.sidebar-text {
  color: #000000;
  font-size: 12px;
  font-weight: bold;
  line-height: 1.6;
}

.nineties-sidebar-link {
  color: #0000FF;
  text-decoration: underline;
  font-weight: bold;
}

.nineties-sidebar-link:hover {
  color: #FF0000;
  background-color: #FFFF00;
}

.spinning-image {
  animation: spin 3s linear infinite;
  border: 3px ridge #FFD700;
  margin: 10px 0;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.vertical-marquee {
  font-size: 11px;
  color: #800080;
  font-weight: bold;
  background-color: #FFFFFF;
  border: 2px solid #000000;
  padding: 5px;
}

.main-content {
  padding: 20px;
  font-size: 14px;
}

.guestbook-table {
  margin: 20px 0;
  animation: guestbookGlow 2s ease-in-out infinite alternate;
}

@keyframes guestbookGlow {
  0% { box-shadow: 0 0 5px #FFD700; }
  100% { box-shadow: 0 0 20px #FFD700, 0 0 30px #FFD700; }
}

.map-container {
  position: relative;
  width: 100%;
  height: 400px;
  margin: 20px 0;
  border: 5px ridge #000000;
}

.nineties-map-button {
  background-color: #FF69B4;
  color: #FFFFFF;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nineties-map-button:hover {
  background-color: #FF1493;
}
</style>

