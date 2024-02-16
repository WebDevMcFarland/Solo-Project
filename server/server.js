const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const userController = require('./controllers/userController')
const recipeController = require('./controllers/recipeController')

const Recipe = require('./models/recipeModel');
const User = require('./models/userModel');

const app = express();


let currentUser = '';


const mongoURI = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2'
mongoose.connect(mongoURI, console.log('Database is connected'));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, '../dist')));

// Route handler for the /login route
app.get('/login', (req, res) => {
   return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/register', (req, res) => {
 return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});



app.post('/register', userController.createUser,(req, res) => {
  return res.redirect('/login')
})



app.post('/login', userController.verifyUser, (req, res) => {
  return res.redirect('/recipes')
})


app.get('/recipes',  userController.loggedIn,(req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/addrecipes', userController.loggedIn,(req, res) => {
 return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
})



// recipeController.addRecipe,
// app.post('/recipes',  (req, res) => {
//   // Redirect to the page where you want to display recipes
//   console.log("route handler req.body", req.body)
//   return res.redirect('/recipes');
// });

app.post('/addrecipes', recipeController.addRecipe, (req, res) => {
  return res.redirect('/recipes')
})

app.get('/getuserrecipes', recipeController.getRecipes, (req, res) => {
  return res.status(200);
});

app.delete('/deleteRecipe/:id', recipeController.deleteRecipe, (req, res) => {
return res.status(200);
})


app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../dist/404.html'));
});



// Start the server
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;