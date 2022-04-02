const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  allergens: [String],
  path: String,
  reviews: [String],
});

const petSchema = new mongoose.Schema({
  name: String,
  favoriteFood: String,
  bio: String,
  path: String,
});

//creat a model for items in the museum
const Recipe = mongoose.model('Recipe', recipeSchema);

// connect to the database
mongoose.connect('mongodb://localhost:27017/recipes', {
  useNewUrlParser: true
});

//create new recipe and add to database; takes a title, description, and list of ingredients
app.post('/api/recipes', async(req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    ingredients: req.body.ingredients,
  });
  try {
    await recipe.save();
    res.send(recipe);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//get list of all recipes in database
app.get('/api/recipes', async(req, res) => {
  try {
    let recipes = await Recipe.find();
    res.send(recipes);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));