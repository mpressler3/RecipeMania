<template>
  <div class="home">
    <h2>See recipes here... eventually</h2>

    <router-link to="/addrecipe">
      <button>ADD YOUR OWN RECIPE</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "RecipeHome",
  data() {
    return {
      recipes: [],
    };
  },
};
</script>