import React, { Component } from 'react';
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

    post('http://localhost:4000/api/v1/users', {user: data})
  }

  handleInputChange(key, value) {
    this.setState(key, value);
  }

  render() {
    return (
      <div>
        <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
        <form onSubmit={this.handleSubmit}>
          <fieldset className="b--transparent ph0 mh0">
            <label className="mt3 db fw6 lh-copy f6">
              First Name
              <input
                className="input ba w-100 pa2 normal f5"
                type="text"
                required={true}
                value={this.state.firstName}
                onChange={(e) => {this.setState({firstName: e.target.value})}}
              />
            </label>
            <label className="mt3 db fw6 lh-copy f6">
              Last Name
              <input
                className="input ba w-100 pa2 normal f5"
                type="text"
                required={true}
                value={this.state.lastName}
                onChange={(e) => {this.setState({lastName: e.target.value})}}
              />
            </label>
            <label className="mt3 db fw6 lh-copy f6">
              Email
              <input
                className="input ba w-100 pa2 normal f5"
                type="email"
                required={true}
                value={this.state.email}
                onChange={(e) => {this.setState({email: e.target.value})}}
              />
            </label>
            <label className="mt3 db fw6 lh-copy f6">
              Password
              <input
                className="input ba w-100 pa2 normal f5"
                type="password"
                required={true}
                value={this.state.password}
                onChange={(e) => {this.setState({password: e.target.value})}}
              />
            </label>
            <label className="mt3 db fw6 lh-copy f6">
              Confirm Password
              <input
                className="input ba w-100 pa2 normal f5"
                type="password"
                required={true}
                value={this.state.passwordConfirmation}
                onChange={(e) => {this.setState({passwordConfirmation: e.target.value})}}
              />
            </label>
          </fieldset>
          <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow f6 dib"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
