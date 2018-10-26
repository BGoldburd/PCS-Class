import React, { Component } from 'react';
import './App.css';
import Recipes from './Recipes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">your favorite recipes!</header>
          <Recipes />
      </div>
    );
  }
}

export default App;
