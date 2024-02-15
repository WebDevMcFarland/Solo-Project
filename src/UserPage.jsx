import React from 'react';
import './UserPage.css';

const addRecipes = () => {
    window.location.href = '/addrecipes'
}

function UserPage(){

    return(
        <div className='recipes'>
        <button className='addRecipe' onClick={addRecipes}>Add Recipes</button>
        </div>
    )
}

export default UserPage;