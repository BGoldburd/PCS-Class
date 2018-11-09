import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class AddedNew extends Component {
    state = {  }
    render() { 
        return (
            <div className="text-center">
                <h1>added {this.props.new}!</h1>
                <Link to="/"><button className="btn btn-outline-primary btn-lg mt-5">return to list</button></Link>
            </div>
        );
    }
}
 
export default AddedNew;