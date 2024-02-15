const User = require('../models/userModel');
const Recipe = require('../models/recipeModel')

const recipeController = {};

recipeController.addRecipe = async (req, res, next) => {
    try {
      // Your middleware logic
      console.log(req.body)
    } catch (err) {
      next(err); // Pass error to error-handling middleware
    }
  };

module.exports = recipeController;