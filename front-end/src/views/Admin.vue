<template>
  <div class="admin">
    <div class="add-food">
      <h2>Add your own Food!</h2>

      <div class="heading">
        <h3>Create Food</h3>
      </div>
      <div class="create">
        <div class="form">
          <input v-model="title" placeholder="Title" />
        </div>
        <p></p>
        <textarea v-model="description" placeholder="Description" />
        <p></p>
        <input class="button" type="file" name="photo" @change="fileChanged" />

        <div class="form">
          <p></p>
          <input v-model="singleAllergen" placeholder="Add any allergens" />
          <button @click="addAllergen">Add</button>
        </div>
        <p></p>

        <div class="form">
          <p></p>
          <textarea v-model="singleReview" placeholder="Add a review" />
          <button @click="addReview">Add</button>
        </div>
        <p></p>

        <button @click="uploadFood()">Upload</button>
      </div>

      <p></p>

      <div class="edit-header">
        <h3>Edit/Delete Foods</h3>
      </div>

      <div class="edit">
        <div class="form">
          <input v-model="findTitle" placeholder="Search" />
          <div class="suggestions" v-if="foodSuggestions.length > 0">
            <div
              class="suggestion"
              v-for="s in foodSuggestions"
              :key="s.id"
              @click="selectFood(s)"
            >
              {{ s.title }}
            </div>
          </div>
        </div>

        <div class="upload" v-if="findFood">
          Title
          <input v-model="findFood.title" />
          <p></p>
          <img :src="findFood.path" />
          Description
          <textarea v-model="findFood.description" />
          <p></p>
        </div>
        <div class="actions" v-if="findFood">
          <button @click="deleteFood(findFood)">Delete</button>
          <button @click="editFood(findFood)">Edit</button>
        </div>
      </div>
    </div>

    <!--Edit pets below this line--> <p></p>

    <div class="add-food">
      <h2>Add a Reviewer</h2>

      <div class="heading">
        <h3>Create Reviewer</h3>
      </div>
      <div class="create">
        <div class="form">
          <input v-model="name" placeholder="Name" />
        </div>
        <p></p>
        <input v-model="favFood" placeholder="Favorite Food" />
        <p></p>
        <textarea v-model="bio" placeholder="Bio" />
        <p></p>
        <input class="button" type="file" name="photo" @change="fileChanged" />
        <p></p>
        <button @click="uploadPet()">Upload</button>
      </div>

      <p></p>

      <div class="edit-header">
        <h3>Edit/Delete Reviewers</h3>
      </div>

      <div class="edit">
        <div class="form">
          <input v-model="findTitlePet" placeholder="Search" />
          <div class="suggestions" v-if="petSuggestions.length > 0">
            <div
              class="suggestion"
              v-for="s in petSuggestions"
              :key="s.id"
              @click="selectPet(s)"
            >
              {{ s.title }}
            </div>
          </div>
        </div>

        <div class="upload" v-if="findPet">
          Name
          <input v-model="findPet.name" />
          <p></p>
          <img :src="findPet.path" />
          Favorite Food
          <input v-model="findPet.favoriteFood" />
          Bio
          <textarea v-model="findFood.description" />
          <p></p>
        </div>
        <div class="actions" v-if="findPet">
          <button @click="deletePet(findPet)">Delete</button>
          <button @click="editPet(findPet)">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddStuff",
  data() {
    return {
      title: "",
      description: "",
      allergens: [],
      singleAllergen: "",
      singleReview: "",
      findFood: null,
      reviews: [],
      foods: [],
      file: null,
      findTitle: "",
      name: "",
      favFood: "",
      bio: "",
      findTitlePet: "",
      findPet: null,
      pets: [],
    };
  },
  computed: {
    //functions run automatically when a data field is changed
    foodSuggestions() {
      let foods = this.foods.filter((food) =>
        food.title.toLowerCase().startsWith(this.findTitle.toLowerCase())
      );
      return foods.sort((a, b) => a.title > b.title);
    },
    petSuggestions() {
      let pets = this.pets.filter((pet) =>
        pet.name.toLowerCase().startsWith(this.findTitlePet.toLowerCase())
      );
      return pets.sort((a, b) => a.name > b.name);
    },
  },
  created() {
    this.getFoods();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    selectFood(f) {
      this.findTitle = "";
      this.findFood = f;
    },
    async getFoods() {
      try {
        let response = await axios.get("/api/food");
        this.foods = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
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
    async deleteFood(item) {
      try {
        await axios.delete("/api/food/" + item._id);
        this.findFood = null;
        this.getFoods();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editFood(item) {
      try {
        await axios.put("/api/food/" + item._id, {
          title: this.findFood.title,
          description: this.findFood.description,
        });
        this.findFood = null;
        this.getFoods();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addAllergen() {
      this.allergens.push(this.singleAllergen);
      this.singleAllergen = "";
    },
    async addReview() {
      this.reviews.push(this.singleReview);
      this.singleReview = "";
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

    selectPet(p) {
      this.findTitlePet = "";
      this.findPet = p;
    },
    async getPets() {
      try {
        let response = await axios.get("/api/pets");
        this.pets = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadPet() {
      try {
        const formData = new FormData();
        formData.append("photo", this.file, this.file.name);
        let r1 = await axios.post("/api/photos", formData);

        let r2 = await axios.post("/api/pets", {
          name: this.name,
          favoriteFood: this.favFood,
          bio: this.bio,
          path: r1.data.path,
        });
        this.addPet = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deletePet(item) {
      try {
        await axios.delete("/api/pets/" + item._id);
        this.findPet = null;
        this.getPets();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editPet(item) {
      try {
        await axios.put("/api/pets/" + item._id, {
          title: this.findPet.title,
          description: this.findPet.description,
        });
        this.findPet = null;
        this.getPets();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.admin {
  display: flexbox;
  text-align: left;
  align-items: left;
  justify-content: left;
  flex-wrap: wrap;
}

.add-food {
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #ffe65b;
  color: #300d0d;
}

.form {
  margin-right: 50px;
}

.upload {
  display: flex;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
  background-color: white;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #fff01f;
  color: #300d0d;
  cursor: pointer;
}

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  /* font-size: 16px; */
}
</style>