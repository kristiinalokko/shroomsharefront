<template>
  <h1>
    Registreeri
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
          <input v-model="password1" type="password" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">Password uuesti</label>
          <input v-model="password2" type="password" class="form-control">
        </div>
        <button @click="register" type="submit" class="btn btn-primary me-3">registreeri</button>
        <button type="submit" class="btn btn-primary">Tagasi</button>
      </div>
      <div class="col">
      </div>
    </div>
  </div>

</template>

<script>
import RegisterService from "@/services/RegisterService";
import NavigationService from "@/services/NavigationService";

export default {
  name: 'RegisterView',
  data() {
    return {
      username:'',
      password1:'',
      password2:'',

      user:{
        username: '',
        password: ''
      },

      errorResponse:{
        message:'',
        errorCode: 0,
      }

    }
  },
  methods: {
    register(){

      if (this.username.length < 1 || this.password1.length < 1 || this.password2.length < 1){
        alert('täida kõik väljad')
      } else if (this.password1 === this.password2) {
        this.user.username = this.username
        this.user.password = this.password1
        RegisterService.sendRegistrationRequest(this.user)
            .then(() => NavigationService.navigateToHome())
            .catch(error => this.handleErrorResponse(error))
      }else {
          alert('passwords dont match')
        }
      },


    handleErrorResponse(error){
      this.errorResponse = error.response.data
      alert(this.errorResponse.message)
    }

  },
  mounted() {
  }
}
</script>