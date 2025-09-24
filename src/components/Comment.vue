<template>
  <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <Image :image-data="comment.imageData" :default-image-data="this.commentImage"/>
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
import defaultCommentImage from '@/assets/comment.png'
import Image from "@/components/Image.vue";


export default {
  name: 'Comment',
  components: {Image: Image,},
  props: {
    comment: {
      username: String,
      body: String,
      rating: Number,
      created: String,
      imageData: String
    }
  },
  data() {
    return {
      commentImage: defaultCommentImage
    }
  },
  methods: {},
  mounted() {
  }
}
</script>