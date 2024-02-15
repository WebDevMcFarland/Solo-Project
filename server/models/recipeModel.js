const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const recipeSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String},
  ingredients: [
    {'name': String, "quantity": Number, "unit": String }
  ]
});

module.exports = mongoose.model('Recipe', recipeSchema);