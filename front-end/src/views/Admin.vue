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
        <input type="file" name="photo" @change="fileChanged" />
        
        <div class="form">
          <p></p>
          <input v-model="singleAllergen" placeholder="Add any allergens" />
          <button @click="addAllergen">Add</button>
        </div>
        <p></p>
        <button @click="uploadFood()">Upload</button>
      </div>

      <div class="header">
          <h3>Edit Foods</h3>
      </div>
      <div class="update">
          
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
      file: null,
    };
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async uploadFood() {
      try {
        const formData = new FormData();
        formData.append("photo", this.file, this.file.name);
        let r1 = await axios.post("/api/photos", formData);
        
        let r2 = await axios.post("/api/food", {
          title: this.title,
          description: this.description,
          allergens: this.allergens,
          path: r1.data.path,
          reviews: this.reviews,
        });
        this.addFood = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addAllergen() {
      this.allergens.push(this.singleAllergen);
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
      } catch (error) {
        console.log(error);
      }
    },
    //pets below
  },
};
</script>