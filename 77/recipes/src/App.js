import React, { Component } from 'react';
import './App.css';
import Recipes from './Recipes';
import Recipes2 from './Recipes2';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">your favorite recipes!</header>
          <Recipes />
          <Recipes2 />
      </div>
    );
  }
}

export default App;
