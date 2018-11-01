import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            zip: 11204,
            units: 'metric'
        }

        this.fetchWeather();
    }

    fetchWeather = () => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=cb7c71219cf09eb0bb414b932669be97&zip=${this.state.zip}&units=${this.state.units}`,
                { zip: this.state.zip, units:this.state.units })
        .then(response => response.json())
        .then(weatherData => {
            console.log(weatherData);
            this.props.getWeather(weatherData);
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleUnitChange = event => {
        this.setState({
            units: event.target.value
        }, () => this.fetchWeather());     
    }

    render() { 
        return ( 
            <div className="row d-flex flex-row-reverse bg-primary mb-5 ml-0 mr-0 justify-content-center">
                <form className="form-inline m-3">
                    <div className="form-group">
                        <input className="form-control" name="zip" id="zip" onBlur={this.fetchWeather} onChange={this.handleInputChange} value={this.state.zip} placeholder="enter zip code" />
                    </div>
                    <div className="form-group ml-2">
                        <select name="units" onChange={this.handleUnitChange} value={this.state.units} className="form-control" id="units">
                            <option value="metric">Celsius</option>
                            <option value="imperial">Farenheit</option>
                            <option value="">Kelvin</option>
                        </select>
                    </div>
                </form>
            </div>
         );
    }
}
 
export default Form;