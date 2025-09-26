<template>
  <h1>Siia tuleb kõikide seente tabel</h1>
  <p>Tabel näitab kõigile ACTIVATED seeni, aga seene lisajale ja adminile ka PENDING seeni</p>
  <p>Hetkel näitab lihtsalt kõiki seeni meie databases:</p>
  <div v-for="shroom in shrooms" class="row mb-3">
    <router-link :to="{ path: '/shroom-info', query: { shroomId: shroom.shroomId } }">
      {{ shroom.shroomName }}
    </router-link>
  </div>
</template>

<script>
import ShroomService from "@/services/ShroomService";

export default {
  name: 'ShroomView',
  data() {
    return {

      shrooms: [
        {
          shroomId: 0,
          shroomName: ''
        }
      ]

    }
  },
  methods: {

    getShrooms() {
      ShroomService.getAllShrooms()
          .then(response => this.shrooms = response.data)
          .catch(error => alert(error.response.data))
    }

  },
  mounted() {
    this.getShrooms()
  }
}
</script>