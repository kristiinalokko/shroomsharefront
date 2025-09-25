<template>
  <div class="mb-3">
    <label for="shroomDropdown" class="form-label">Vali seen</label>
    <input
        type="text"
        class="form-control mb-2"
        v-model="shroomSearch"
        placeholder="Vali seen..."
        @focus="dropdownOpen = true"
        @blur="dropdownOpen = false"
    />
    <div class="dropdown" v-if="dropdownOpen && filteredShrooms.length">
      <ul class="dropdown-menu w-100 show">
        <li
            v-for="shroom in filteredShrooms"
            :key="shroom.id"
        >
          <a
              class="dropdown-item"
              href="#"
              @mousedown.prevent="selectShroom(shroom)"
          >
            {{ shroom.name }}
          </a>
        </li>
      </ul>
    </div>
    <button
        class="btn btn-primary mt-2"
        :disabled="!selectedShroom"
        @click="addSelectedShroom"
    >
      Lisa seen
    </button>
  </div>
</template>

<script>
import ShroomService from "@/services/ShroomService";

export default {
  name: "ShroomDropdown",
  data() {
    return {
      shrooms: [],
      shroomSearch: '',
      selectedShroom: null,
      dropdownOpen: false
    };
  },
  computed: {
    filteredShrooms() {
      return this.shrooms.filter((s) =>
          s.name.toLowerCase().includes(this.shroomSearch.toLowerCase())
      );
    },
  },
  methods: {
    selectShroom(shroom) {
      this.selectedShroom = shroom;
      this.shroomSearch = shroom.name;
      this.dropdownOpen = false;
    },
    getAllShrooms() {
      ShroomService.getAllShrooms()
          .then(response => {
            this.shrooms = response.data;
          })
    },
    addSelectedShroom() {
      if (this.selectedShroom) {
        this.$emit('add-shroom', this.selectedShroom);
        this.selectedShroom = null;
        this.shroomSearch = '';
      }
    }
  },
  mounted() {
    this.getAllShrooms();
  }
};
</script>