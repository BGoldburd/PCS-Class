import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class RecipeList extends Component {
    state = {
        editing: false
    }

    handleToggleEdit = () => {
        this.setState({
            editing: !this.state.editing
        });
    }

    render() { 
        const recipeList = this.props.recipes.map(recipe => (
            <div key={recipe.id}>
                <li className="text-capitalize listItem" style={this.state.editing ? {display: 'inline'} : {}}>
                <button onClick={() => this.props.deleteRecipe(recipe.id)} className="btn btn-outline-danger btn-sm mr-2 mt-1 mb-1" style={!this.state.editing ? {display: 'none'} : {fontSize: '.7rem'}}>delete</button>
                    <Link to="/recipes/details" onClick={() => this.props.handleRecipeSelection(recipe)}>
                        {recipe.name}
                    </Link>
                </li>
            </div>)
        );

        return (
            <>
                <div className="d-flex justify-content-between">
                    <button onClick={this.handleToggleEdit} className="btn btn-sm btn-primary mb-2">{this.state.editing ? 'Done' : 'Edit'}</button>
                    <button onClick={this.props.deleteAll} className="btn btn-sm btn-danger ml-3 mb-2" style={!this.state.editing ? {display: 'none'} : {}}>delete all</button>
                </div>
                <ul style={this.state.editing ? {padding: 0} : {}}>{recipeList}</ul>
            </>
        );
    }
}
 
export default RecipeList;