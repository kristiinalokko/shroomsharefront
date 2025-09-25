<template>
  <div class="star-rating">
    <span
        v-for="star in 5"
        :key="star"
        :class="getStarClass(star)"
        class="star-icon"
    >
      {{ getStarSymbol(star) }}
    </span>
    <span class="rating-text ms-2">{{ avgRating }} / 5</span>
  </div>
</template>

<script>
export default {
  name: 'StarRating',
  props: {
    avgRating: Number,
  },
  methods: {
    getStarClass(starPosition) {
      if (this.avgRating >= starPosition) {
        return 'star-full'
      } else if (this.avgRating >= starPosition - 0.5) {
        return 'star-half'
      } else {
        return 'star-empty'
      }
    },
    getStarSymbol(starPosition) {
      if (this.avgRating >= starPosition) {
        return '★' // Full star
      } else if (this.avgRating >= starPosition - 0.5) {
        return '★' // Half star (we'll use CSS to show half)
      } else {
        return '☆' // Empty star
      }
    }
  }
}
</script>

<style scoped>
.star-rating {
  display: flex;
  align-items: center;
}

.star-icon {
  font-size: 1.8rem;
  margin-right: 0.1rem;
  position: relative;
  display: inline-block;
}

.star-full {
  color: #ffc107;
}

.star-half {
  background: linear-gradient(90deg, #ffc107 50%, #e9ecef 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: #ffc107;
}

.star-empty {
  color: #e9ecef;
}

.rating-text {
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 500;
}
</style>