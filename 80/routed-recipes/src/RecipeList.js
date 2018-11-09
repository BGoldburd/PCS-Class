import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class RecipeList extends Component {
    state = {  }
    render() { 
        const recipeList = this.props.recipes.map(recipe => <li><Link to="/details" key={recipe.id}
            onClick={() => this.props.handleRecipeSelection(recipe)}>{recipe.name}</Link></li>);

        return (
            <ul>{recipeList}</ul>
        );
    }
}
 
export default RecipeList;