import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import RecipeDetails from './RecipeDetails';
import RecipeList from './RecipeList';
import AddRecipe from './AddRecipe';
import Header from './Header';
import AddedNew from './AddedNew';

class App extends Component {
  state = {
    recipes: [
      {
        id: 0,
        name: 'Chicken Soup',
        ingredients: ['chicken', 'vegetables', 'spices', 'water'],
        instructions: ['add water to pot', 'add vegetables', 'add chicken', 'add spices', 'bring to rapid boil', 'simmer for 1 and half hours'],
        picture: 'https://whatscookingamerica.net/wp-content/uploads/2017/09/Jewish-Chicken-Soup-closeup-1280x720.jpg'
      },
      {
        id: 1,
        name: 'Chulent',
        ingredients: ['meat', 'potatoes', 'beans', 'spices', 'water'],
        instructions: ['add everything to pot', 'cook for at least 10 hours'],
        picture: 'http://1zbu2wo4b4720erk34pts2lh.wpengine.netdna-cdn.com/wp-content/uploads/2015/06/a1.jpg'
      }
    ]
  };

  componentDidMount() {
    if (localStorage.recipes) {
      this.setState({
        recipes: JSON.parse(localStorage.recipes)
      })
    }
  }

  handleRecipeSelection = (recipe) => {
    this.setState({
      selectedRecipe: recipe
    });
  }

  handleAddRecipe = (recipe) => {
    const newRecipeArray = [...this.state.recipes];
    const newRecipe = {id: newRecipeArray.length, ...recipe};
    newRecipeArray.push(newRecipe);
    this.setState({
      recipes: newRecipeArray
    });
    localStorage.recipes = JSON.stringify(newRecipeArray);
  }

  handleDeleteRecipe = id => {
    const oldRecipeArray = [...this.state.recipes];
    const newRecipeArray = oldRecipeArray.filter(recipe => recipe.id !== id);
    localStorage.recipes = JSON.stringify(newRecipeArray);
    this.setState({
      recipes: newRecipeArray
    });
  }

  handleDeleteAll = () => {
    localStorage.recipes = JSON.stringify([]);
    this.setState({
      recipes: []
    });
  }

  render() {

    return (
      <>
        <Header />
        <Switch>
          <Route path="/recipes" exact render={() => <RecipeList deleteRecipe={this.handleDeleteRecipe} deleteAll={this.handleDeleteAll} recipes={this.state.recipes} handleRecipeSelection={this.handleRecipeSelection}/>} />
          <Route path="/recipes/details" render={() => <RecipeDetails recipe={this.state.selectedRecipe} />} />
          <Route path="/recipes/addRecipe" render={(routeProps) => <AddRecipe {...routeProps} handleAddRecipe={this.handleAddRecipe}/>} />
          <Route path="/recipes/addedNew" render={() => <AddedNew new={this.state.recipes[this.state.recipes.length - 1].name}/>} />
          <Route path="/recipes/test/:id" render={(props) => <h1>on page {props.match.params.id}</h1>} />
          <Redirect exact from="/" to="/recipes" />
        </Switch>
      </>
    );
  }
}

export default App;
