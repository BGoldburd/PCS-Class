import React, { Component } from 'react';

class Student extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.student.name,
            address: this.props.student.address
        };
    }

    render() {
        return (
            <div>
                <h2>name: {this.state.name}</h2>
                <h2>address: {this.state.address}</h2>
            </div>
        );
    }
}

export default Student;