import React from 'react';

function RecipeListView(props) {
    console.log(props);
    return (
        <ul>
            {props.recipes.map(recipe => <li key={recipe.id} >{recipe.name}</li>)}
        </ul>
    )
}

export default RecipeListView;