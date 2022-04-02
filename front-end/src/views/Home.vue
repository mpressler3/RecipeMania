<template>
  <div class="home">
    <section class="image-gallery">
      <div class="image" v-for="item in food" :key="item.id">
        <h2>{{ item.title }}</h2>
        <img :src="item.path" />
        <h3>Description</h3>
        <p>{{ item.description }}</p>
        <h3>Allergens</h3>
        <p v-for="allergen in item.allergens" :key="allergen">
          {{ allergen }}
        </p>
        <h3>Reviews</h3>
        <p v-for="review in item.reviews" :key="review">
          {{ review }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FoodHome",
  data() {
    return {
      food: [],
    };
  },
  created() {
    this.getFood();
  },
  methods: {
    async getFood() {
      try {
        let response = await axios.get("/api/food");
        this.food = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

@media only screen and (max-width: 5000px) and (min-width: 768px) {
  .image-gallery {
    column-count: 2;
  }
}

@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 1;
  }
}
</style>