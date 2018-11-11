import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className="text-center">
            <h1>PCS Recipe App</h1>
            <Link to="/recipes">Home</Link> | <Link to="/recipes/addRecipe">Add Recipe</Link>
            </div>
            <hr />
        </>
    );
}
 
export default Header;