<template>
  <div class="admin">
    <div class="add-food">
      <h2>Add your own recipe!</h2>

      <div class="heading">
        <h3>Create Recipe</h3>
      </div>
      <div class="create">
        <div class="form">
          <input v-model="title" placeholder="Title" />
        </div>
        <p></p>
        <textarea v-model="description" placeholder="Description" />
        <p></p>
        <button @click="uploadFood">Upload</button>
        <div class="form" v-if="addFood">
          <p></p>
          <input v-model="singleAllergen" placeholder="Add any allergens" />
          <button @click="addAllergen">Add</button>
        </div>
        <button @click="updateFood(addFood)">Submit</button>
      </div>
    </div>

    <!--Edit pets below this line-->
  </div>
</template>

<style scoped>
.admin {
  text-align: left;
  align-items: left;
  justify-content: left;
  display: flex;
}
</style>

<script>
import axios from "axios";
export default {
  name: "AddRecipe",
  data() {
    return {
      title: "",
      description: "",
      allergens: [],
      singleAllergen: "",
      addFood: null,
      reviews: [],
      recipes: [],
    };
  },
  methods: {
    async uploadPicture() {
      try {
        const formData = new FormData();
        formData.append("photo", this.file, this.file.name);
        let r1 = await axios.post("/api/photos", formData);
        return r1;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadFood() {
      try {
        let r1 = await this.uploadPicture();
        let r2 = await axios.post("/api/food", {
          title: this.title,
          description: this.description,
          path: r1.data.path,
        });
        this.addFood = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addAllergen() {
        this.addFood.allergens.push(singleAllergen);
        this.singleAllergen = "";
    },
    async updateFood(food) {
        try {
            await axios.put("/api/food/" + food._id, {
                title: this.food.title,
                description: this.food.description,
                allergens: this.food.allergens,
                reviews: this.food.reviews,
            });
            this.addFood = null;
        } catch(error) {
            console.log(error);
        }
    },
    //pets below
  },
};
</script>