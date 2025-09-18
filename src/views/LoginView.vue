<template>
  <h1>
    Tere, palun logi sisse
  </h1>

  <div class="container text-center justify-content-center">
    <div class="row">
      <div class="col">
      </div>
      <div class="col">
        <form>
          <div class="mb-3">
            <label class="form-label">Kasutajanimi</label>
            <input v-model="username" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="password" class="form-control">
          </div>
          <button @click="login" type="submit" class="btn btn-primary">Sisene</button>
        </form>
      </div>
      <div class="col">
      </div>
    </div>
  </div>
</template>

<script>
import LoginService from "@/services/LoginService";

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {

    login(username, password) {

      LoginService.sendLoginRequest(username, password)
          .then()
          .catch()



    }

  },

  mounted() {
  }
}
</script>