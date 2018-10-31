import React, { Component } from 'react';

class RecipeDetails extends Component {
    state = {
        feedback: ''
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    save = event => {
        event.preventDefault();
        this.props.onChange(this.state.feedback, this.props.index);
        this.setState({
            feedback: ''
        });
    }

    render() { 
        return ( 
            <div id="details" className={this.props.className}>
                <h2 style={{textDecoration: 'underline' }}>{this.props.recipe.name}</h2>
                <img src={this.props.recipe.image} alt={this.props.recipe.name}/>
                <h3 style={{color: this.props.color}}>instructions:</h3>
                <div>{this.props.recipe.instructions}</div>
                <form onSubmit={this.save}>
                    <label>Feedback: <input name="feedback" onChange={this.handleInputChange} value={this.state.feedback} /></label>
                    <button>submit!</button>
                </form>
            </div>
         );
    }
}
 
export default RecipeDetails;