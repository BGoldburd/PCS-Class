import React, { Component } from 'react';
import './App.css';
import Student from './student'

// const student1 = {
//   name: 'moshe',
//   address: '1771 Madison Ave'
// }

// const student2 = {
//   name: 'chaim',
//   address: '615 6th Street'
// }

class StudentCreator {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }
}

const student1 = new StudentCreator('moshe', '1771 Madison Ave')
const student2 = new StudentCreator('chaim', '615 6th Street')

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Student student={student1} />
          <Student student={student2} />
        </header>
      </div>
    );
  }
}

export default App;
