import React, { Component } from 'react';
import axios from 'axios';

class UsersAdmin extends Component {

	state = {
		users: [],
	}

	componentDidMount() {
	  axios.get('users')
	    .then(result => {
	      console.log('users result: ', result);
	      this.setState({ users: result.users });
	    })
	    .catch(error => {
	      console.log('error: ', error);
	    })   
	}

  render() {
    return (
      <div>
        this will display a list of all users
        <ul>
          {this.state.users.map(user => <li>{user.email}</li>)}
        </ul>
      </div>
    );
  }
}

export default UsersAdmin;
