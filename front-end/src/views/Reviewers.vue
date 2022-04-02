<template>
  <div class="home">
    <section class="image-gallery">
      <div class="image" v-for="reviewer in reviewers" :key="reviewer.id">
        <h2>{{ reviewer.name }}</h2>
        <img :src="reviewer.path" />
        <p>{{ reviewer.favoriteFood }}</p>
        <p>{{ reviewer.bio }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Reviewers",
  data() {
    return {
      reviewers: [],
    };
  },
  created() {
    this.getReviewers();
  },
  methods: {
    async getReviewers() {
      try {
        let response = await axios.get("/api/pets");
        this.reviewers = response.data;
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

.image-gallery {
  column-count: 1;
}
</style>