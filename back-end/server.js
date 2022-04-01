const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


const mongoose = require('mongoose');
//create scheme for items in the museum: a title and a path to an image
const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  ingredients: [String],
});
//creat a model for items in the museum
const Recipe = mongoose.model('Recipe', recipeSchema);

// connect to the database
mongoose.connect('mongodb://localhost:27017/recipes', {
  useNewUrlParser: true
});


app.listen(3000, () => console.log('Server listening on port 3000!'));