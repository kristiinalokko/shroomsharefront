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
            <input class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input class="form-control">
          </div>
          <button type="submit" class="btn btn-primary">Sisene</button>
        </form>
      </div>
      <div class="col">

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {}
  },
  methods: {},
  mounted() {
  }
}
</script>