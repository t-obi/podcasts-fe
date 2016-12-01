import React, { Component } from 'react';
import { Link } from 'react-router';
import { post } from './api';

class Register extends Component {

	state = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		passwordConfirmation: '',
	}

	handleSubmit = (event) => {
		console.log('register!!');

		event.preventDefault();
		event.stopPropagation();

		const { firstName, lastName, email, password, passwordConfirmation} = this.state;
		const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    post('http://localhost:4000/api/v1/register', {user: data})
    // fetch('http://localhost:4000/api/v1/register', {
    // 	method: 'post',
    // 	body: JSON.stringify({user: data}),
    // });


		//httpPost('http://localhost:4000/api/v1/register', {user: data})
	}

	handleInputChange(key, value) {
		this.setState(key, value);
	}

  render() {
    return (
      <div className="view-container registrations new">
        <main>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <input
	              type="text"
	              placeholder="First name"
	              required={true}
	              value={this.state.firstName}
	              onChange={(e) => {this.setState({firstName: e.target.value})}}
              />
            </div>
            <div className="field">
              <input
	              type="text"
	              placeholder="Last name"
	              required={true}
	              value={this.state.lastName}
	              onChange={(e) => {this.setState({lastName: e.target.value})}}
              />
            </div>
            <div className="field">
              <input
	              type="email"
	              placeholder="Email"
	              required={true}
	              value={this.state.email}
	              onChange={(e) => {this.setState({email: e.target.value})}}
              />
            </div>
            <div className="field">
              <input
	              type="password"
	              placeholder="Password"
	              required={true}
	              value={this.state.password}
	              onChange={(e) => {this.setState({password: e.target.value})}}
              />
            </div>
            <div className="field">
              <input
	              type="password"
	              placeholder="Confirm password"
	              required={true}
	              value={this.state.passwordConfirmation}
	              onChange={(e) => {this.setState({passwordConfirmation: e.target.value})}}
              />
            </div>
            <button type="submit">Sign up</button>
          </form>
          <Link to="/sign_in">Sign in</Link>
        </main>
      </div>
    );
  }
}

export default Register;
