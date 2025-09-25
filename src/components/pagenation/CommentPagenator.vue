<template>
  <div class="comment-paginator">
    <ul class="comment-list">
      <li
          v-for="(comment, index) in paginatedComments"
          :key="index"
          class="comment-item"
      >
          <Comment :comment="comment"/>
      </li>
    </ul>
    <Pagenator
        :value="currentPage"
        :totalItems="comments.length"
        :pageSize="pageSize"
        @event-input="handlePageChange"
    >
      <template slot="prev">&laquo; </template>
      <template slot="next"> &raquo;</template>
    </Pagenator>
  </div>
</template>

<script>
import Pagenator from "@/components/pagenation/base/Pagenator.vue";
import Comment from "@/components/Comment.vue";

export default {
  name: "CommentPagenator",
  components: {
    Comment,
    Pagenator,
  },
  props: {
    comments: Array,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 2,
    };
  },
  computed: {
    paginatedComments() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.comments.slice(start, start + this.pageSize);
    },
  },
  methods: {
    handlePageChange(newPage) {
      this.currentPage = newPage;
    },
  },
};
</script>
