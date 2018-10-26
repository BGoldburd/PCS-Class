import React, { Component } from 'react';
import RecipeDetails from './RecipeDetails';
import Cholent from './images/cholent.jpg'
import Chicken from './images/chicken.jpg'
import Kugel from './images/kugel.jpg'

class Recipes extends Component {
    state = { 
        recipes: [
            {
                name: 'cholent',
                instructions: 'add whatever you want',
                image: Cholent
            },
            {
                name: 'chicken',
                instructions: 'ask your wife',
                image: Chicken
            },
            {
                name: 'kugel',
                instructions: 'find some in shul',
                image: Kugel
            }
        ],
        selectedRecipe: null
    };

    showDetails = recipe => {
        this.setState({
            selectedRecipe: recipe
        });
    }

    getRecipes() {
        return this.state.recipes.map((recipe, index) => <li key={index} onClick={() => this.showDetails(recipe)}>{recipe.name}</li>);
    }

    render() { 
        const selectedRecipe = this.state.selectedRecipe ? <RecipeDetails recipe={this.state.selectedRecipe}/> : null;
        
        return (
            <React.Fragment>
                <div id="list">
                    <ul> 
                        {this.getRecipes()}
                    </ul>
                </div>
                {selectedRecipe}
            </React.Fragment>
        );
    }
}
 
export default Recipes;