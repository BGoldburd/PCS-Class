import React, { Component } from 'react';
import RecipeDetails from './RecipeDetails';
import Cholent from './images/cholent.jpg';
import Chicken from './images/chicken.jpg';
import Kugel from './images/kugel.jpg';
import './Recipes2.css';

class Recipes2 extends Component {
    state = { 
        recipes: [
            {
                id: 0,
                name: 'cholent',
                instructions: 'add whatever you want',
                image: Cholent
            },
            {
                id: 1,
                name: 'chicken',
                instructions: 'ask your wife',
                image: Chicken
            },
            {
                id: 2,
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

    update = (newText, i) => {
        this.setState(prevState => ({
            recipes: prevState.recipes.map(
                recipe => (recipe.id !== i) ? recipe : {...recipe, name: `${newText} ${recipe.name}`}
            )
        }));
    }

    getRecipes() {
        return this.state.recipes.map((recipe, index) => <li key={index} onClick={() => this.showDetails(recipe)}>{recipe.name}</li>);
    }

    render() { 
        const selectedRecipe = this.state.selectedRecipe ? <RecipeDetails onChange={this.update} index={this.state.selectedRecipe.id} className="recipes2" color="yellow" recipe={this.state.selectedRecipe}/> : null;
        
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
 
export default Recipes2;