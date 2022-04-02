const express = require('express');
const bodyParser = require("body-parser");

//This is for images
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/food', {
  useNewUrlParser: true
});

const foodSchema = new mongoose.Schema({
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

//creat a model
const Food = mongoose.model('Food', foodSchema);
const Pet = mongoose.model('Pet', petSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});


/* FOOD ITEM ENDPOINTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

//get list of all foods in database
app.get('/api/food', async (req, res) => {
  try {
    let foods = await Food.find();
    res.send(foods);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//create new food item and add to database; takes a title, description, and list of ingredients
app.post('/api/food', async (req, res) => {
  const food = new Food({
    title: req.body.title,
    description: req.body.description,
    allergens: req.body.allergens,
    path: req.body.path,
    reviews: req.body.reviews,
  });
  try {
    await food.save();
    res.send(food);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


//Update food item
app.put('api/food/:id', async (req, res) => {
  try {
    let food = await Food.findOne(req.params.id);
    food.title = req.body.title;
    food.description = req.body.description;
    food.allergens = req.body.allergens;
    food.reviews = req.body.reviews;
    await food.save();
    res.send(food);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Delete food item
app.put('api/food/:id', async (req, res) => {
  try {
    await Food.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


/* PET ENDPOINTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
//get list of all pets in database
app.get('/api/pets', async (req, res) => {
  try {
    let pets = await Pet.find();
    res.send(pets);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//create new food item and add to database; takes a title, description, and list of ingredients
app.post('/api/pets', async (req, res) => {
  const pet = new Pet({
    name: req.body.name,
    favoriteFood: req.body.favoriteFood,
    bio: req.body.bio,
    path: req.body.path,
  });
  try {
    await pet.save();
    res.send(pet);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


//Update food item
app.put('api/pets/:id', async (req, res) => {
  try {
    let pet = await Pet.findOne(req.params.id);
    pet.name = req.body.name;
    pet.favoriteFood = req.body.favoriteFood;
    pet.bio = req.body.bio;
    await pet.save();
    res.send(pet);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Delete food item
app.put('api/pets/:id', async (req, res) => {
  try {
    await Pet.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));