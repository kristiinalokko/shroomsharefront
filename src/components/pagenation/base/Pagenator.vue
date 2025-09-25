<template>
  <div class="paginator">
    <button
        class="prev"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
    >
      <slot name="prev">&laquo; </slot>
    </button>

    <div class="page-buttons">
      <button v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }"
          @click="changePage(page)" class="page-number" >
        {{ page }}
      </button>
    </div>

    <button
        class="next"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
    >
      <slot name="next"> &raquo;</slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagenator",
  props: {
    value: {
      type: Number,
      default: 1,
    },

    totalItems: Number,

    pageSize: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.value;
      },
      set(newPage) {
        this.$emit('event-input', newPage);
      },
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
};
</script>
