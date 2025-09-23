<template>
  <div class="container text-center">
    <div class="row>">
      <h1>Lisa asukoht</h1>
    </div>
    <div class="row">
      <div class="col">
        map
      </div>
      <div class="col-4">
        <div class="row mb-3">
          <LocationImage :image-data="imageData" class="img-fluid"/>
        </div>
        <div class="row mb-3">
          <label>Asukoha nimi:</label>
          <input v-model="location.locationName" type="text" class="form-control" placeholder="Parim seenekoht">
        </div>
        <div class="row mb-3">
          <div class="input-group">
            <span class="input-group-text">Asukoha kirjeldus</span>
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
          <button @click="saveLocation" type="button" class="btn btn-primary mb-3">Salvesta</button>
          <button type="button" class="btn btn-secondary">Tagasi</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import LocationImage from "@/components/LocationImage.vue";
import ImageInput from "@/components/ImageInput.vue";
import LocationService from "@/services/LocationService";
import NavigationService from "@/services/NavigationService";

export default {
  name: 'LocationView',
  components: {ImageInput, LocationImage},
  data() {
    return {
      resetFileInput: false,

      location:{
        userId: sessionStorage.getItem("userId"),
        locationName: '',
        latitude: 0,
        longitude: 0,
        description: '',
        locationImage: '',
      },

      imageData:'',

      errorResponse: {
        message: '',
        errorCode: 0,
      }
    }
  },
  methods:{
    setLocationImageData(imageData){
      this.imageData = imageData
      this.location.locationImage = imageData
    },
    setResetFileInputToFalse(){
      this.resetFileInput = false
    },
    saveLocation(){
      if (this.inputIsValid()){
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
    }
  },

  mounted() {
  }
}
</script>