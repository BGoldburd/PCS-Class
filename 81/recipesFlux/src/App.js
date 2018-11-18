import React, { Component } from 'react';
import RecipeDetails from './RecipeDetails';
import RecipeListContainer from './containers/RecipeListContainer';

class App extends Component {
  state = {
    recipes: [
      
    ]
  };

  handleRecipeSelection = (event, recipe) => {
    this.setState({
      selectedRecipe: recipe
    });
  }

  render() {
    const recipeList = <ul>{
      this.state.recipes.map(recipe => <li key={recipe.id}
        onClick={event => this.handleRecipeSelection(event, recipe)}>{recipe.name}</li>)}</ul>

    return (
      <React.Fragment>
        <h1 className="text-center">PCS Recipe App</h1>
        <hr />
        <RecipeListContainer />
        <hr />
        <RecipeDetails recipe={this.state.selectedRecipe} />
      </React.Fragment>
    );
  }
}

export default App;
