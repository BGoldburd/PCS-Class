import React, { Component } from 'react';
import propTypes from 'prop-types';

class RecipeDetails extends Component {
    state = {
        showPicture: false
    };

    getListItems(items) {
        return items.map((item, index) => <li key={index}>{item}</li>);
    }

    handleTogglePicture = () => {
        this.setState({
            showPicture: !this.state.showPicture
        });
    }

    render() {
        const { recipe } = this.props;

        // probably should be in app...
        if (!recipe) {
            return <h3 className="text-center text-danger">Please click 'Home' and select a recipe</h3>
        }

        const picture = this.state.showPicture ?
            <img className="rounded mx-auto d-block" style={{ height: '148px' }} src={recipe.picture} alt={recipe.name} /> :
            null;

        return (
            <React.Fragment>
                <h3 className="text-capitalize"><u>{recipe.name}</u></h3>
                <button className="btn btn-sm btn-primary mt-2 mb-2" onClick={this.handleTogglePicture}>
                    {this.state.showPicture ? 'hide' : 'show'} picture</button>
                {picture}
                <h3>Ingredients:</h3>
                <ul>{this.getListItems(recipe.ingredients)}</ul>
                <h3>Instructions:</h3>
                <ol>{this.getListItems(recipe.instructions)}</ol>
            </React.Fragment>
        );
    }
}

export default RecipeDetails;

// If you arent ready for typescript or flow...
RecipeDetails.propTypes = {
    recipe: propTypes.exact({
        id: propTypes.number,
        name: propTypes.string,
        ingredients: propTypes.arrayOf(propTypes.string),
        instructions: propTypes.arrayOf(propTypes.string),
        picture: propTypes.string
    }).isRequired
}