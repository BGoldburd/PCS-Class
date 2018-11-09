import React, { Component } from 'react';

class AddRecipe extends Component {
    state = {
        instructions: [],
        ingredients: [],
        instructionInputs: [],
        ingredientInputs: []
    };

    componentDidMount() {
        this.addIngredientInput();
        this.addInstructionInput();
    }
    


/////////// UPDATE STATE VALUES //////////////////////////////////////////////////////////////////

    handleNameInput = event => {
        this.setState({
            name: event.target.value
        });
    }

    handleInstructionInput = event => {
        const newInstructions = [...this.state.instructions];
        const newValue = event.target.value;
        newInstructions[event.target.name] = newValue;
        this.setState({
            instructions: newInstructions
        });
    }

    handleIngredientInput = event => {
        const newIngredients = [...this.state.ingredients];
        const newValue = event.target.value;
        newIngredients[event.target.name] = newValue;
        this.setState({
            ingredients: newIngredients
        });
    }


//////////// ADD INPUT FIELDS ///////////////////////////////////////////////////////////////////////////////

    addInstructionInput = () => {
        const newInputArray = [...this.state.instructionInputs];
        const newInput = <input name={newInputArray.length} onChange={this.handleInstructionInput} value={this.state.instructions[newInputArray.length]} className="form-control" id="instructions" placeholder="Enter instruction" required/>
        newInputArray.push(newInput);
        this.setState({
            instructionInputs: newInputArray
        });
    }

    addIngredientInput = () => {
        const newInputArray = [...this.state.ingredientInputs];
        const newInput = <input name={newInputArray.length} onChange={this.handleIngredientInput} value={this.state.ingredients[newInputArray.length]} className="form-control" id="ingredients" placeholder="Enter ingredient" required/>
        newInputArray.push(newInput);
        this.setState({
            ingredientInputs: newInputArray
        });
    }


/////////// REMOVE INPUT FIELDS ////////////////////////////////////////////////////////////////

    removeIngredientInput = () => {
        const newInputArray = [...this.state.ingredientInputs];
        const newIngredientsArray = [...this.state.ingredients];
        if (newInputArray.length === newIngredientsArray.length) {
            newIngredientsArray.pop();
        }
        newInputArray.pop();
        this.setState({
            ingredients: newIngredientsArray,
            ingredientInputs: newInputArray
        });
    }

    removeInstructionInput = () => {
        const newInputArray = [...this.state.instructionInputs];
        const newInstructionsArray = [...this.state.instructions];
        if (newInputArray.length === newInstructionsArray.length) {
            newInstructionsArray.pop();
        }
        newInputArray.pop();
        this.setState({
            instructions: newInstructionsArray,
            instructionInputs: newInputArray
        });
    }


////////// SUBMIT FORM //////////////////////////////////////////////////////////////////////////

    handleSubmit = event => {
        this.props.handleAddRecipe({
            name: this.state.name,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions
        });
        this.props.history.push("/addedNew");
        event.preventDefault();
    }

    
    
    
    render() {
        return (
            <>
                <h3>Add Recipe:</h3>
                <form className="w-50" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="name">Recipe name</label>
                        <input name="name" onChange={this.handleNameInput} value={this.state.name} className="form-control" id="name" placeholder="Enter name" required/>
                    </div>
                    <div className="form-group">
                        <label for="ingredients">Ingredients</label>
                        {this.state.ingredientInputs}
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" onClick={this.addIngredientInput} className="btn btn-default btn-sm">
                            <span>+</span> Add
                        </button>
                        <button onClick={this.removeIngredientInput} type="button" className="btn btn-outline-danger btn-sm" style={this.state.ingredientInputs.length <= 1 ? {display: 'none'} : {}}>
                            remove
                        </button>
                    </div>
                    <div className="form-group">
                        <label for="instructions">Instructions</label>
                        {this.state.instructionInputs}
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" onClick={this.addInstructionInput} className="btn btn-default btn-sm">
                            <span>+</span> Add
                        </button>
                        <button onClick={this.removeInstructionInput} type="button" className="btn btn-outline-danger btn-sm" style={this.state.instructionInputs.length <= 1 ? {display: 'none'} : {}}>
                            remove
                        </button>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </>
        );
    }
}
 
export default AddRecipe;