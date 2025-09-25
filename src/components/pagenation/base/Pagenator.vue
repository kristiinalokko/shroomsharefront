<template>
  <div class="paginator">
    <button
        class="prev"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
    >
      <slot name="prev">&laquo; Prev</slot>
    </button>

    <span>
      Page {{ currentPage }} of {{ totalPages }}
    </span>

    <button
        class="next"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
    >
      <slot name="next">Next &raquo;</slot>
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
