import React, { Component } from 'react';

class RecipeDetails extends Component {
    render() { 
        return ( 
            <div id="details">
                <h2 style={{textDecoration: 'underline' }}>{this.props.recipe.name}</h2>
                <img src={this.props.recipe.image} alt={this.props.recipe.name}/>
                <h3>instructions:</h3>
                <div>{this.props.recipe.instructions}</div>
            </div>
         );
    }
}
 
export default RecipeDetails;