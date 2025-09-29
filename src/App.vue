<template>
  <nav>
    <router-link to="/locations"> Locations |</router-link>

    <router-link to="/">| Home |</router-link>

    <router-link to="/shroom-table">| Seened |</router-link>

    <router-link to="/location-table">| Asukohad |</router-link>

    <router-link v-if="!isLoggedIn" to="/login">| Logi sisse |</router-link>

    <router-link v-if="isLoggedIn" to="/profile">| Profiil </router-link>

    <router-link v-if="!isLoggedIn" to="/register">| Registreeri </router-link>

    <template v-if="isLoggedIn">
      <font-awesome-icon @click="logOut" class="cursor-pointer" icon="fa-solid fa-right-from-bracket"/>
    </template>

    <button class="top-right-button">
      Inbox
    </button>
  </nav>
  <router-view @event-logged-in="updateNavMenu"/>

</template>

<script>

import SessionStorageService from "@/services/SessionStorageService";
import NavigationService from "@/services/NavigationService";

export default {
  name: 'App',
  components: {SessionStorageService},
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
    }
  },
  methods: {

    updateNavMenu() {
      this.isLoggedIn = SessionStorageService.isLoggedIn()
      this.isAdmin = SessionStorageService.isAdmin()
    },

    logOut() {
      sessionStorage.clear()
      this.updateNavMenu()
      NavigationService.navigateToHome()
    },

  },
  mounted() {
    this.updateNavMenu()
  }
}


</script>

