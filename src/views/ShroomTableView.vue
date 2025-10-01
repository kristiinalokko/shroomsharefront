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
  <div class="row justify-content-center">
    <button @click="shroomModalIsOpen=true" type="button" class="btn btn-primary col-3 me-3">Lisa uus seen
    </button>
    <ShroomModal :shroomModalIsOpen="shroomModalIsOpen" :shroom-id="0" @event-close-modal="shroomModalIsOpen = false"/>
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
            {{ getStatusLabel(shroom.status) }}</td>
          <td>
            <div v-if="shroom.status !== 'D'" class="btn-group" role="group" aria-label="Basic example">
              <button @click="NavigationService.navigateToError()" type="button" class="btn btn-primary">Muuda</button>
              <button @click="NavigationService.navigateToShroomInfoView(shroom.shroomId)" type="button" class="btn btn-secondary">Vaata lähemalt</button>
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
import ShroomModal from "@/components/modal/ShroomModal.vue";

export default {
  name: 'ShroomTableView',
  components: {ShroomModal},
  computed: {
    NavigationService() {
      return NavigationService
    }
  },
  data() {
    return {
      shroomModalIsOpen: false,
      isLoggedIn: SessionStorageService.isLoggedIn(),
      isAdmin: SessionStorageService.isAdmin(),
      userId: Number(sessionStorage.getItem("userId")),

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
    }

  },
  mounted() {
    this.getAllShrooms()
  }
}
</script>