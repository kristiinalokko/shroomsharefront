<template>
  <h1>Siin on kõik asukohad meie andmebaasis (mis on hetkel aktiivsed)</h1>
  <div class="row">
    <div class="col">
    </div>
    <div class="col">
      <table v-if="locations.length>0" class="table">
        <thead>
        <tr>
          <th scope="col">Asukoha nimi</th>
          <th scope="col">Kirjeldus</th>
          <th scope="col">Lisas</th>
        </tr>
        </thead>
        <tbody v-for="location in locations">
        <tr v-if="location.status === 'A'">
          <th scope="row">
            <router-link :to="{ path: '/location-info', query: { locationId: location.locationId } }">
              {{ location.locationName }}
            </router-link>
          </th>
          <td>{{ location.description }}</td>
          <td>{{ location.username }}</td>
        </tr>
        </tbody>
      </table>
      <!--      todo: võiks olla vastus "Ei leidnud ühetegi asukohta", kui ta ei leidnud ühtegi aktiivset asukohta-->
      <div v-else> Ei leidnud ühtegi asukohta!</div>
    </div>
    <div class="col">
    </div>
  </div>
  <div>
    <button @click="NavigationService.navigateToAddLocationView" type="button" class="btn btn-primary col-3 me-3">Lisa uus asukoht </button>
  </div>
  <div v-if="isLoggedIn" class="row">
    <h1 class="mt-5">Siin on sinu lisatud asukohad: </h1>
  </div>
  <div v-if="isLoggedIn" class="row">
    <div class="col">
    </div>
    <div class="col ms-5 me-5">
      <table v-if="locations.length>0" class="table">
        <thead>
        <tr>
          <th scope="col">Asukoha nimi</th>
          <th scope="col">Kirjeldus</th>
          <th v-if="isAdmin" scope="col">Lisas</th>
          <th scope="col">Staatus</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody v-for="location in locations">
        <tr v-if="(userId===location.userId) || isAdmin">
          <th scope="row">
            <router-link :to="{ path: '/location-info', query: { locationId: location.locationId } }">
              {{ location.locationName }}
            </router-link>
          </th>
          <td>{{ location.description }}</td>
          <td v-if="isAdmin">{{ location.username }}</td>
          <td :class="getStatusClass(location.status)">
            {{ getStatusLabel(location.status) }}</td>
          <td>
            <div v-if="location.status !== 'D'" class="btn-group" role="group" aria-label="Basic example">
              <button @click="NavigationService.navigateToEditLocationView(location.locationId)" type="button" class="btn btn-primary">Muuda</button>
              <button @click="NavigationService.navigateToLocationInfoView(location.locationId)" type="button" class="btn btn-secondary">Vaata lähemalt</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="col">
    </div>
  </div>


</template>

<script>
import ShroomService from "@/services/ShroomService";
import SessionStorageService from "@/services/SessionStorageService";
import NavigationService from "@/services/NavigationService";
import locationService from "@/services/LocationService";

export default {
  name: 'LocationTableView',
  computed: {
    NavigationService() {
      return NavigationService
    }
  },
  data() {
    return {
      isLoggedIn: SessionStorageService.isLoggedIn(),
      isAdmin: SessionStorageService.isAdmin(),
      userId: Number(sessionStorage.getItem("userId")),

      locations: [
        {
          locationId: 0,
          userId: 0,
          username: '',
          locationName: '',
          description: '',
          status: ''
        }
      ],

      errorResponse: {
        message: '',
        errorCode: 0
      },

    }
  },
  methods: {

    getAllLocations() {
      locationService.sendGetAllTableLocationsRequest()
          .then(response => this.handleGetAllResponse(response))
          .catch(error => this.handleErrorResponse(error))
    },

    handleGetAllResponse(response) {
      this.locations = response.data
    },

    handleErrorResponse(error) {
      this.errorResponse = error.response.data
      // alert(this.errorResponse.message)
    },

    getStatusLabel(status) {
      if (status === 'A') return 'Aktiivne';
      if (status === 'P') return 'Ootel';
      if (status === 'D') return 'Deaktiveeritud';
      return status;
    },
    getStatusClass(status) {
      if (status === 'A') return 'text-success';
      if (status === 'P') return 'text-warning';
      if (status === 'D') return 'text-danger';
      return '';
    }

  },
  mounted() {
    this.getAllLocations()
  }
}
</script>