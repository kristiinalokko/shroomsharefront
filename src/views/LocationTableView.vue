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
          <th scope="col">Lemmik</th>
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
          <td>
            <div v-if="isLoggedIn" class="favorite-small">
              <Favorite :is-favorite="location.isFavorite"
                        :location-id="location.locationId"
                        :user-id="userId"
                        @event-delete-favorite="handleDeleteFavorite"
                        @event-add-favorite="handleAddFavorite"
              />
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <!--      todo: võiks olla vastus "Ei leidnud ühetegi asukohta", kui ta ei leidnud ühtegi aktiivset asukohta-->
      <div v-else> Ei leidnud ühtegi asukohta!</div>
    </div>
    <div class="col">
    </div>
  </div>
  <div v-if="isLoggedIn">
    <button @click="NavigationService.navigateToAddLocationView" type="button" class="btn btn-primary col-3 me-3">Lisa
      uus asukoht
    </button>
  </div>
  <div v-if="isLoggedIn" class="row">
    <h1 class="mt-5">Siin on sinu lisatud asukohad: </h1>
    <AlertDanger :message="errorResponse.message"/>
    <AlertSuccess :message="successMessage"/>
    <div class="col">
    </div>
    <div class="col ms-5 me-5">
      <div v-if="isAdmin" class="btn-group mb-3 w-100" role="group" aria-label="Status filter">
        <input v-model="showActive" type="checkbox" class="btn-check" id="btnActive" autocomplete="off">
        <label class="btn btn-outline-success" for="btnActive">Aktiivne</label>

        <input v-model="showPending" type="checkbox" class="btn-check" id="btnPending" autocomplete="off">
        <label class="btn btn-outline-warning" for="btnPending">Ootel</label>

        <input v-model="showDeactivated" type="checkbox" class="btn-check" id="btnDeactivated" autocomplete="off">
        <label class="btn btn-outline-danger" for="btnDeactivated">Deaktiveeritud</label>
      </div>
    </div>
    <div class="col">
    </div>
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
        <tbody v-for="location in filteredLocations">
        <tr v-if="(userId===location.userId) || isAdmin">
          <th scope="row">
            <router-link :to="{ path: '/location-info', query: { locationId: location.locationId } }">
              {{ location.locationName }}
            </router-link>
          </th>
          <td>{{ location.description }}</td>
          <td v-if="isAdmin">{{ location.username }}</td>
          <td :class="getStatusClass(location.status)">
            {{ getStatusLabel(location.status) }}
          </td>
          <td>
            <div v-if="location.status !== 'D'" class="btn-group" role="group" aria-label="Basic example">
              <button @click="NavigationService.navigateToEditLocationView(location.locationId)" type="button"
                      class="btn btn-primary">Muuda
              </button>
              <button @click="NavigationService.navigateToLocationInfoView(location.locationId)" type="button"
                      class="btn btn-secondary">Vaata lähemalt
              </button>
              <button v-if="isAdmin && location.status=== 'P'" @click="activateLocation(location.locationId)"
                      type="button"
                      class="btn btn-success">Aktiveeri
              </button>
              <button v-if="(userId === location.userId || isAdmin) && location.status !== 'D'"
                      @click="confirmationModalIsOpen=true; locationId=location.locationId" type="button"
                      class="btn btn-danger">Deaktiveeri
              </button>
              <DeleteConfirmationModal :confirmationModalIsOpen="confirmationModalIsOpen"
                                       @event-delete="deleteLocation(locationId)"
                                       @event-close-modal="handleCloseModal"/>
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
import SessionStorageService from "@/services/SessionStorageService";
import sessionStorageService from "@/services/SessionStorageService";
import NavigationService from "@/services/NavigationService";
import locationService from "@/services/LocationService";
import DeleteConfirmationModal from "@/components/modal/DeleteConfirmationModal.vue";
import Favorite from "@/components/Favorite.vue";
import FavoriteService from "@/services/FavoriteService";
import AlertDanger from "@/components/AlertDanger.vue";
import AlertSuccess from "@/components/AlertSuccess.vue";

export default {
  name: 'LocationTableView',
  components: {AlertSuccess, AlertDanger, Favorite, DeleteConfirmationModal},
  computed: {
    filteredLocations() {
      if (!this.isAdmin) return this.locations;

      return this.locations.filter(location => {
        if (location.status === 'A' && this.showActive) return true;
        if (location.status === 'P' && this.showPending) return true;
        if (location.status === 'D' && this.showDeactivated) return true;
        return false;
      });
    },
    NavigationService() {
      return NavigationService
    }
  },
  data() {
    return {
      confirmationModalIsOpen: false,
      isLoggedIn: SessionStorageService.isLoggedIn(),
      isAdmin: SessionStorageService.isAdmin(),
      userId: Number(sessionStorage.getItem("userId")),
      locationId: 0,

      locations: [
        {
          locationId: 0,
          userId: 0,
          username: '',
          locationName: '',
          description: '',
          status: '',
          isFavorite: false
        }
      ],

      successMessage: '',

      errorResponse: {
        message: '',
        errorCode: 0
      },

      showActive: true,
      showPending: true,
      showDeactivated: true,

    }
  },
  methods: {

    getAllLocations() {
      locationService.sendGetAllTableLocationsRequest(this.userId)
          .then(response => this.handleGetAllResponse(response))
          .catch(error => this.handleErrorResponse(error))
    },

    handleGetAllResponse(response) {
      this.locations = response.data
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
    },

    activateLocation(locationId) {
      locationService.sendActivateLocationRequest(locationId)
          .then(() => {
            this.getAllLocations()
            this.handleSuccessAlert("Aktiveeritud")
          })
          .catch(error => this.handleErrorResponse(error))
    },

    deleteLocation(locationId) {
      locationService.sendDeactivateLocationRequest(locationId)
          .then(() => {
            this.confirmationModalIsOpen = false;
            this.getAllLocations()
            this.handleSuccessAlert("Kustutatud")
          })
          .catch(error => this.handleErrorResponse(error))
    },

    handleCloseModal() {
      this.confirmationModalIsOpen = false
      this.getAllLocations()
    },

    handleDeleteFavorite(event) {
      FavoriteService.deleteFavorite(event.userId, event.locationId)
          .then(() => this.getAllLocations())
          .catch(error => this.handleErrorResponse(error))
    },

    handleAddFavorite(event) {
      FavoriteService.addFavorite(event.userId, event.locationId)
          .then(() => this.getAllLocations())
          .catch(error => this.handleErrorResponse(error))
    },

    handleErrorResponse(error) {
      this.errorResponse = error.response.data
      setTimeout(this.resetAlertMessage, 4000)
      // alert(this.errorResponse.message)
    },

    handleSuccessAlert(message){
      this.successMessage = message
      setTimeout(this.resetAlertMessage, 4000)
    },

    resetAlertMessage() {
      this.errorResponse.message = ''
      this.successMessage = ''
    },


  },
  mounted() {
    this.getAllLocations()
  }
}
</script>