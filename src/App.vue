<template>
  <nav>
    <router-link to="/locations">Locations | </router-link>

    <router-link to="/">Home | </router-link>

    <router-link to="/shroom">Seened | </router-link>

    <router-link v-if="!isLoggedIn" to="/login">Login | </router-link>

    <router-link v-if="!isLoggedIn" to="/register">Registreeri </router-link>

    <router-link v-if="isLoggedIn" @click="logOut" to="/">Logi välja</router-link>

  </nav>
  <router-view @event-user-logged-in="updateNavMenu"/>

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

