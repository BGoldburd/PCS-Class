import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class AddedNew extends Component {
    state = {  }
    render() { 
        return (
            <>
                <h1>added {this.props.new}</h1>
                <Link to="/"><button className="btn btn-primary">return to home</button></Link>
            </>
        );
    }
}
 
export default AddedNew;