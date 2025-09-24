<template>
  <div class="container text-center">
    <div class="row>">
      <h1 v-if="this.locationId > 0">Muuda asukohta</h1>
      <h1 v-else>Lisa asukoht</h1>
    </div>
    <div class="row">
      <div class="col">
        map
      </div>
      <div class="col-4">
        <div class="row mb-3">
          <Image :image-data="location.locationImage" :default-image-data="forestImageData"/>
        </div>
        <div class="row mb-3">
          <label>Asukoha nimi:</label>
          <input v-model="location.locationName" type="text" class="form-control" placeholder="Parim seenekoht">
        </div>
        <div class="row mb-3">
          <label class="text-center mb-2">Kirjeldus</label>
          <div class="input-group">
            <textarea v-model="location.description" class="form-control"></textarea>
          </div>
        </div>
        <div class="row mb-3">
          vali asukoht kaardil
        </div>
        <div class="row mb-3">
          "valitud asukoht"
        </div>
        <div class="row mb-3">
          <div class="mb-3">
            <label>Lisa pilt</label>
            <ImageInput :reset-file-input="resetFileInput"
                        @event-new-image-selected="setLocationImageData"
                        @event-reset-image-select-complete="setResetFileInputToFalse"/>
          </div>
        </div>
        <div class="row mb-3">
          <button v-if="isEdit" @click="updateLocation" type="button" class="btn btn-primary mb-3">Uuenda</button>
          <button v-else @click="saveLocation" type="button" class="btn btn-primary mb-3">Salvesta</button>
          <button type="button" class="btn btn-secondary">Tagasi</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isEdit">
    <hr class="my-4">
    <h3>Lisa seen</h3>
    <div class="container text-center">
      <div class="row">
        <div class="col">
          seene pilt
        </div>
        <div class="col">
          dropdown seene valimiseks
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import Image from "@/components/Image.vue";
import ImageInput from "@/components/ImageInput.vue";
import LocationService from "@/services/LocationService";
import NavigationService from "@/services/NavigationService";
import {useRoute} from "vue-router";
import locationService from "@/services/LocationService";
import defaultForestImage from "@/assets/forest.jpg";
import defaultShroomImage from "@/assets/shroom.png";

export default {
  name: 'LocationView',
  components: {ImageInput, Image: Image},
  data() {
    return {
      isEdit: false,
      resetFileInput: false,
      locationId: Number(useRoute().query.locationId),
      forestImageData: defaultForestImage,
      shroomImageData: defaultShroomImage,

      location:{
        userId: 0,
        locationName: '',
        latitude: 0,
        longitude: 0,
        description: '',
        locationImage: '',
      },

      errorResponse: {
        message: '',
        errorCode: 0,
      }
    }
  },
  methods:{

    updateLocation(){
      if (this.inputIsValid()){
        locationService.sendUpdateLocationRequest(this.location)
            .then(() => NavigationService.navigateToHome())
            .catch(error => this.handleErrorResponse(error))
      }
    },

    getLocation(locationId){
      LocationService.sendLocationRequest(locationId)
          .then(response => this.handleGetLocationResponse(response))
          .catch(error => this.handleErrorResponse(error))
    },

    handleGetLocationResponse(response) {
      this.location = response.data
    },

    setLocationImageData(imageData){
      this.location.locationImage = imageData
    },

    setResetFileInputToFalse(){
      this.resetFileInput = false
    },

    saveLocation(){
      if (this.inputIsValid()){
        this.location.userId = sessionStorage.getItem('userId')
        LocationService.sendNewLocationRequest(this.location)
            .then(() => NavigationService.navigateToHome())
            .catch(error => this.handleErrorResponse(error))
      } else {
        alert("täida kõik väljad")
      }
    },

    inputIsValid() {
      return this.location.locationName.length > 0 && this.location.description.length > 0 ;
    },

    handleErrorResponse(error) {
      this.errorResponse = error.response.data
      alert(this.errorResponse.message)
    },

  },

  mounted() {
    this.isEdit = this.locationId > 0;
    if (this.isEdit){
      this.getLocation(this.locationId)
    }
  }
}
</script>