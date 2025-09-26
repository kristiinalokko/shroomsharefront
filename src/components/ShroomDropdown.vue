<template>
  <div class="mb-3">
    <label for="shroomDropdown" class="form-label">Vali seen</label>
    <input
        ref="shroomInput"
        type="text"
        class="form-control mb-2"
        v-model="shroomSearch"
        placeholder="Vali seen..."
        @focus="dropdownOpen = true"
        @blur="dropdownOpen = false"
    />
    <div class="dropdown" >
      <ul class="dropdown-menu w-100 show" v-if="dropdownOpen && filteredShrooms.length">
        <li
            v-for="shroom in filteredShrooms"
            :key="shroom.shroomId"
        >
          <a
              class="dropdown-item"
              href="#"
              @mousedown.prevent="selectShroom(shroom.shroomId)"
          >
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
  name: "ShroomDropdown",
  data() {
    return {
      shrooms: [
        {
          shroomId: 0,
          shroomName: ''
        }
      ],
      shroomSearch: '',
      selectedShroom: null,
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
    selectShroom(shroomId) {
      this.$emit('event-new-shroom-selected', shroomId)
      this.dropdownOpen = false
      this.$refs.shroomInput.blur()
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