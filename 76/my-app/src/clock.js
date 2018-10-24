import React, { Component } from 'react';

class Clock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: new Date().toLocaleTimeString()
        };

        setInterval(() => this.setState({
            time: new Date().toLocaleTimeString()
        }), 1000);
    }

    render() {
        return (
            <div>
                <h1>PCS Clock</h1>
                <h2>The time is now {this.state.time}</h2>
            </div>
        );
    }
}

export default Clock;