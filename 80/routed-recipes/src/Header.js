import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className="text-center">
            <h1>PCS Recipe App</h1>
            <Link to="/">Home</Link> | <Link to="/addRecipe">Add Recipe</Link>
            </div>
            <hr />
        </>
    );
}
 
export default Header;