<template>
  <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        Siin on pilt
        <img v-if="comment.imageData !== ''" :src="comment.imageData" class="img-thumbnail" alt="Kommentaari pilt">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <p class="card-text"> {{ comment.body }} </p>
          <p class="card-text"><small class="text-body-secondary">Lisatud: {{comment.created}}</small></p>
          <p class="card-text"><small class="text-body-secondary">Kommentaari lisas: {{comment.username}}</small></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {

    comment: {
      username: String,
      body: String,
      rating: Number,
      created: String,
      imageData: String
    }
  },
  methods: {},
  mounted() {
  }
}
</script>