import React from 'react';
import './AddRecipe.css';
import { useState } from 'react';

function AddRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: '',
        description: '',
        ingredients: [{ name: '', amount: '', unit: '' }]
    });

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const list = [...recipeData.ingredients];
        list[index][name] = value;
        setRecipeData({ ...recipeData, ingredients: list });
    };

    const handleAddIngredient = () => {
        setRecipeData({
            ...recipeData,
            ingredients: [...recipeData.ingredients, { name: '', amount: '', unit: '' }]
        });
    };

    const handleRemoveIngredient = index => {
        const list = [...recipeData.ingredients];
        list.splice(index, 1);
        setRecipeData({ ...recipeData, ingredients: list });
    };
    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     console.log(recipeData); // Log recipeData before submitting
    //     // Add your logic to submit recipe data to backend
    // };
    

    return (
        <div className="recipe-page">
            <div className='title'>ADD YOUR RECIPE</div>
            <form className="recipe-form" action="/addrecipes" method="POST">
                <div className="recipe-input">
                    <label htmlFor="title">Recipe Name: </label>
                    <input
                        name="title"
                        type="text"
                        value={recipeData.title}
                        onChange={e => setRecipeData({ ...recipeData, title: e.target.value })}
                        placeholder="Recipe Name"
                        required
                    />
                </div>
                <div className="recipe-input">
                    <label htmlFor="description">Recipe Description: </label>
                    <input
                        name="description"
                        type="text"
                        value={recipeData.description}
                        onChange={e => setRecipeData({ ...recipeData, description: e.target.value })}
                        placeholder="Recipe Description"
                        required
                    />
                </div>
                {recipeData.ingredients.map((ingredient, index) => (
                    <div key={index} className="recipe-input">
                        <input
                            name="name"
                            type="text"
                            value={ingredient.name}
                            onChange={e => handleChange(index, e)}
                            placeholder="Ingredient Name"
                            required
                        />
                        <input
                            name="amount"
                            type="text"
                            value={ingredient.amount}
                            onChange={e => handleChange(index, e)}
                            placeholder="Amount"
                            required
                        />
                        <input
                            name="unit"
                            type="text"
                            value={ingredient.unit}
                            onChange={e => handleChange(index, e)}
                            placeholder="Unit"
                            required
                        />
                        {index !== 0 && <button className="recipe-remove-ingredient" type="button" onClick={() => handleRemoveIngredient(index)}>Remove</button>}
                    </div>
                ))}
                <button className="recipe-add-ingredient" type="button" onClick={handleAddIngredient}>Add Ingredient</button>
                <button className="recipe-submit" type="submit" >Submit Recipe</button> 
            </form>
        </div>
    );
}
//onClick={handleSubmit}
export default AddRecipe;