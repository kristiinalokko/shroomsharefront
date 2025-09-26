<template>
  <h1>
    Tere, palun logi sisse
  </h1>

  <div class="container text-center justify-content-center">
    <div class="row">
      <div class="col">
      </div>
      <div class="col">
          <div class="mb-3">
            <label class="form-label">Kasutajanimi</label>
            <input v-model="username" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control">
          </div>
          <button @click="login" type="submit" class="btn btn-primary me-3">Sisene</button>
          <button type="submit" class="btn btn-primary">Tagasi</button>
      </div>
      <div class="col">
      </div>
    </div>
  </div>
</template>

<script>
import LoginService from "@/services/LoginService";
import NavigationService from "@/services/NavigationService";

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',

      loginResponse: {
        userId: 0,
        roleName: ''
      },

      errorResponse: {
        message: '',
        errorCode: 0
      }



    }
  },
  methods: {

    login() {

      LoginService.sendLoginRequest(this.username, this.password)
          .then(response => this.handleLoginResponse(response))
          .catch(error => this.handleErrorResponse(error))
    },

    handleLoginResponse(response) {
      this.loginResponse = response.data
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      this.$emit('event-logged-in')
      NavigationService.navigateToHome()
    },

    handleErrorResponse(error) {
      this.errorResponse = error.response.data
      alert(this.errorResponse.message)
    },

  },

  mounted() {
  }
}
</script>