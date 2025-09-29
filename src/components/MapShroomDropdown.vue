<template>
  <div class="mb-3">
    <label for="mapShroomDropdown" class="form-label">Vali seen</label>
    <input
        ref="shroomInput"
        type="text"
        class="form-control mb-2"
        v-model="shroomSearch"
        :placeholder="selectedShroomName"
        @focus="onFocus"
        @blur="onBlur"
    />
    <div class="dropdown">
      <ul class="dropdown-menu w-100 show" v-if="dropdownOpen && filteredShrooms.length">
        <li>
          <a class="dropdown-item" href="#" @mousedown.prevent="selectShroom(null)">
            <strong>Kõik seened</strong>
          </a>
        </li>
        <li><hr class="dropdown-divider"></li>
        <li v-for="shroom in filteredShrooms" :key="shroom.shroomId">
          <a class="dropdown-item" href="#" @mousedown.prevent="selectShroom(shroom.shroomId)">
            {{ shroom.shroomName }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ShroomService from "@/services/ShroomService";
import NavigationService from "@/services/NavigationService";

export default {
  name: "MapShroomDropdown",
  props: {
    placeholder: {
      type: String,
      default: "Vali seen..."
    }
  },
  data() {
    return {
      shrooms: [],
      shroomSearch: '',
      selectedShroomName: 'Kõik seened',
      dropdownOpen: false
    };
  },
  computed: {
    filteredShrooms() {
      return this.shrooms.filter((s) =>
          s.shroomName.toLowerCase().includes(this.shroomSearch.toLowerCase())
      );
    },
  },
  methods: {
    onFocus() {
      this.shroomSearch = '';
      this.dropdownOpen = true;
    },
    onBlur() {
      this.shroomSearch = '';
      this.dropdownOpen = false;
    },
    selectShroom(shroomId) {
      const shroomObj = shroomId
          ? this.shrooms.find(s => s.shroomId === shroomId)
          : { shroomId: null, shroomName: "Kõik seened" };

      this.selectedShroomName = shroomObj.shroomName;
      this.shroomSearch = '';

      this.$emit('event-new-shroom-selected', shroomId, shroomObj);

      this.dropdownOpen = false;
      this.$refs.shroomInput.blur();
    },
    getAllShrooms() {
      ShroomService.getAllShrooms()
          .then(response => {
            this.shrooms = response.data;
          })
          .catch(() => NavigationService.navigateToError())
    },
  },
  mounted() {
    this.getAllShrooms();
  }
};
</script>

<style scoped>
.dropdown-divider {
  margin: 0.5rem 0;
}
</style>