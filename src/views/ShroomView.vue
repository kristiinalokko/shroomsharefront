<template>
  <h1>Siia tuleb kõikide seente tabel</h1>
  <p>Tabel näitab kõigile ACTIVATED seeni, aga seene lisajale ja adminile ka PENDING seeni</p>
  <p>Hetkel näitab lihtsalt kõiki seeni meie databases:</p>
<!--  <router-link :to="{ path: '/shroom-info', query: { shroomId: shroom.shroomId } }">-->
<!--    {{ shroom.shroomName }}-->
<!--  </router-link>-->

  <table class="table">
    <thead>
    <tr>
      <th scope="col">Seene nimi</th>
      <th scope="col">Kirjeldus</th>
      <th scope="col">Lisas</th>
      <th scope="col">Lisamise kuupäev</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="shroom in shrooms">
      <th scope="row">{{shroom.shroomName}}</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    </tbody>
  </table>


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