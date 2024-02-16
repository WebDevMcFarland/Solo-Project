const User = require('../models/userModel');
const Recipe = require('../models/recipeModel');
const userController = require('./userController');

const recipeController = {};

recipeController.addRecipe = async (req, res, next) => {
    try {
        // Retrieve the user ObjectId from the cookie
        const userId = req.cookies.SSID;

        // Check if userId is valid ObjectId (optional)
        // If not, handle the case accordingly

        // Query the user from the database using the ObjectId
        const user = await User.findById(userId);

        if (!user) {
            // Handle case where user is not found
            return res.status(404).json({ error: "User not found" });
        }

        const {title, description, ingredients} = req.body

        // Create a new recipe object
        const newRecipe = {
            title,
            description,
            ingredients: req.body.ingredients
        };

        // Add the new recipe to the user's recipes array
        user.recipes.push(newRecipe);

        console.log(user.recipes)
        await user.save();


        return next();
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
};

recipeController.getRecipes = async (req, res, next) => {
  try {
      // Assuming you have a way to identify the current user, for example, using req.user
      const userId = req.cookies.SSID; // Assuming the user ID is stored in req.user
      console.log(userId)
      const user = await User.findById(userId); // Fetch recipes for the current user
      console.log(user.recipes)
      res.json(user.recipes); // Assuming the recipes are stored in a field called 'recipes'
  } catch (error) {
      console.error('Error fetching user recipes:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

recipeController.deleteRecipe = async (req, res, next) => {
    const { id } = req.params;

    const userId = req.cookies.SSID;
    const user = await User.findById(userId);


    console.log(id)

    try {
        // Find the recipe by ID and delete it
        const deletedRecipe = await User.findByIdAndUpdate(
            userId,
            { $pull: { recipes: { _id: id } } },
            { new: true }
        );

        if (!deletedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        console.log('Recipe deleted successfully');
        return res.status(200).json({ message: 'Recipe deleted successfully' }); // Send a success response
    } catch (error) {
        console.error('Error deleting recipe:', error);
        return next(error); // Pass the error to the error-handling middleware
    }
};

module.exports = recipeController;