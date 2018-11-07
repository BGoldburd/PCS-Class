import React, { Component } from 'react';
import './App.css';
import Posts from './Posts';
import { NavLink } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: ''
    }

    this.getUsers();
  }

  getUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
      this.setState({
        users: users
      })
    });
  }

  render() {
    const usersList = this.state.users ?
        this.state.users.map((user, index) => <li style={{cursor: 'pointer'}} key={index}>
                                                <NavLink to={`/${user.id}`}>{user.name}</NavLink>
                                              </li>)
        : null;

    return (
      <React.Fragment>
        <h1 className="text-center">PCS Blog</h1>
        <hr/>
        {usersList}
        {this.state.users && <hr/>}
        <Switch>
          <Route path="/:id" render={({ match }) => <Posts id={match.params.id} users={this.state.users}/>} />
          <Route path="/" exact render={() => this.state.users && <h3 className="text-center text-danger">Please select a user</h3>} />
        </Switch>
        
      </React.Fragment>
    );
  }
}

export default App;
