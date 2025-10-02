<template>
  <h1>Siin on kõik seened meie andmebaasis:</h1>
  <div class="row">
    <div class="col">
    </div>
    <div class="col">
      <table v-if="shrooms.length>0" class="table">
        <thead>
        <tr>
          <th scope="col">Seene nimi</th>
          <th scope="col">Kirjeldus</th>
          <th scope="col">Lisas</th>
        </tr>
        </thead>
        <tbody v-for="shroom in shrooms">
        <tr v-if="shroom.status === 'A'">
          <th scope="row">
            <router-link :to="{ path: '/shroom-info', query: { shroomId: shroom.shroomId } }">
              {{ shroom.shroomName }}
            </router-link>
          </th>
          <td>{{ shroom.description }}</td>
          <td>{{ shroom.username }}</td>
        </tr>
        </tbody>
      </table>
      <div v-else> Ei leidnud ühtegi seent!</div>
    </div>
    <div class="col">
    </div>
  </div>
  <div v-if="isLoggedIn" class="row justify-content-center">
    <button @click="shroomModalIsOpen=true; shroomId = '0'" type="button" class="btn btn-primary col-3 me-3">Lisa uus seen
    </button>
  </div>
  <div v-if="isLoggedIn" class="row">
    <h1 class="mt-5">Siin on sinu lisatud seened: </h1>
  </div>
  <div v-if="isLoggedIn" class="row">
    <div class="col">
    </div>
    <div class="col ms-5 me-5">
      <table v-if="shrooms.length>0" class="table">
        <thead>
        <tr>
          <th scope="col">Seene nimi</th>
          <th scope="col">Kirjeldus</th>
          <th v-if="isAdmin" scope="col">Lisas</th>
          <th scope="col">Staatus</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody v-for="shroom in shrooms">
        <tr v-if="(userId===shroom.userId) || isAdmin">
          <th scope="row">
            <router-link :to="{ path: '/shroom-info', query: { shroomId: shroom.shroomId } }">
              {{ shroom.shroomName }}
            </router-link>
          </th>
          <td>{{ shroom.description }}</td>
          <td v-if="isAdmin">{{ shroom.username }}</td>
          <td :class="getStatusClass(shroom.status)">
            {{ getStatusLabel(shroom.status) }}
          </td>
          <td>
            <div v-if="shroom.status !== 'D'" class="btn-group" role="group" aria-label="Basic example">
              <button @click="shroomModalIsOpen=true; shroomId=shroom.shroomId" type="button" class="btn btn-primary">Muuda</button>
              <button @click="NavigationService.navigateToShroomInfoView(shroom.shroomId)" type="button"
                      class="btn btn-secondary">Vaata lähemalt
              </button>
              <button v-if="sessionStorageService.isAdmin() && shroom.status=== 'P'" @click="activateShroom(shroom.shroomId)" type="button"
                      class="btn btn-success">Aktiveeri
              </button>
              <button v-if="sessionStorageService.isAdmin() && shroom.status !== 'D'"
                      @click="confirmationModalIsOpen=true; shroomId=shroom.shroomId" type="button" class="btn btn-danger">Deaktiveeri
              </button>
              <DeleteConfirmationModal :confirmationModalIsOpen="confirmationModalIsOpen"
                                       @event-delete="deleteShroom(shroomId)"
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
  <ShroomModal :shroomModalIsOpen="shroomModalIsOpen" :shroomId="shroomId" @event-close-modal="handleCloseModal"/>

</template>

<script>
import ShroomService from "@/services/ShroomService";
import SessionStorageService from "@/services/SessionStorageService";
import sessionStorageService from "@/services/SessionStorageService";
import NavigationService from "@/services/NavigationService";
import ShroomModal from "@/components/modal/ShroomModal.vue";
import DeleteConfirmationModal from "@/components/modal/DeleteConfirmationModal.vue";
import shroomService from "@/services/ShroomService";

export default {
  name: 'ShroomTableView',
  components: {DeleteConfirmationModal, ShroomModal},
  computed: {
    sessionStorageService() {
      return sessionStorageService
    },
    NavigationService() {
      return NavigationService
    }
  },
  data() {
    return {
      confirmationModalIsOpen: false,
      shroomModalIsOpen: false,
      isLoggedIn: SessionStorageService.isLoggedIn(),
      isAdmin: SessionStorageService.isAdmin(),
      userId: Number(sessionStorage.getItem("userId")),
      shroomId: 0,

      shrooms: [
        {
          shroomId: 0,
          userId: 0,
          username: '',
          shroomName: '',
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

    deleteShroom(shroomId) {
      ShroomService.sendDeleteShroomRequest(shroomId)
          .then(() => {
            this.confirmationModalIsOpen = false;
            this.getAllShrooms()
          })
          .catch(error => this.handleErrorResponse(error))
    },

    getAllShrooms() {
      ShroomService.getAllShroomsDetailedInfo()
          .then(response => this.handleGetAllResponse(response))
          .catch(error => this.handleErrorResponse(error))
    },

    handleGetAllResponse(response) {
      this.shrooms = response.data
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
    },

    handleCloseModal(){
      this.shroomModalIsOpen = false;
      this.confirmationModalIsOpen = false;
      this.getAllShrooms()
    },

    activateShroom(shroomId){
      shroomService.sendActivateShroomRequest(shroomId)
          .then(() => this.getAllShrooms())
          .catch(error => this.handleErrorResponse(error))
    }

  },
  mounted() {
    this.getAllShrooms()
  }
}
</script>