<template>
  <h1>
    Tere, palun registreeri
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
          <label class="form-label">Salasõna</label>
          <input v-model="password1" type="password" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">Salasõna uuesti</label>
          <input v-model="password2" type="password" class="form-control">
        </div>
        <button @click="register" type="submit" class="btn btn-primary me-3">Registreeri</button>
        <button type="submit" class="btn btn-primary">Tagasi</button>
      </div>
      <div class="col">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      username: '',
      password1: '',
      password2: ''
    }
  },
  methods: {},
  mounted() {
  }
}
</script>