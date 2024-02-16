const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: String,
  description: String,
  ingredients: [{ name: String, amount: String, unit: String }]
});

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  recipes: [recipeSchema],
});

module.exports = mongoose.model('User', userSchema);
