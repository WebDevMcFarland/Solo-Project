import React, { useState, useEffect } from 'react';
import './UserPage.css';
import axios from 'axios'; // Import Axios library

const addRecipes = () => {
    window.location.href = '/addrecipes';
}

function UserPage() {
    const [userRecipes, setUserRecipes] = useState([]);

    // Fetch user recipes when the component mounts
    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                // Make a GET request to fetch user recipes from the backend
                const response = await axios.get('/getuserrecipes');
                setUserRecipes(response.data); // Update state with fetched recipes
            } catch (error) {
                console.error('Error fetching user recipes:', error);
            }
        };
        fetchUserRecipes();
    }, []);

    // Function to handle recipe deletion
    const handleDeleteRecipe = async (recipeId) => {
        try {
            // Make a DELETE request to delete the recipe
            await axios.delete(`/deleteRecipe/${recipeId}`);
            // Filter out the deleted recipe from the userRecipes state
            setUserRecipes(userRecipes.filter(recipe => recipe._id !== recipeId));
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    return (
        <div className='recipes'>
            <div className="recipe-grid">
                {/* Render user recipes */}
                {userRecipes.map(recipe => (
                    <div className='recipe-container' key={recipe._id}>
                        {/* Box around the title */}
                        <div className="title-box">
                            <h2 className='recipe-title'>{recipe.title}</h2>
                        </div>
                        <p className='recipe-description'><strong>Description:</strong> {recipe.description}</p>
                        <h3 className='recipe-ingredients'>Ingredients:</h3>
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li className='recipe-ingredient' key={index}>{ingredient.name}: {ingredient.amount} {ingredient.unit}</li>
                            ))}
                        </ul>
                        {/* Delete button */}
                        <button className='deleteButton' onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
                    </div>
                ))}
            </div>
            <button className='addRecipe' onClick={addRecipes}>Add Recipe</button>
        </div>
    )
}

export default UserPage;