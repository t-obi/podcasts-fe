import React, { Component } from 'react';
import { post } from '../util/api';

class Signup extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  handleSubmit = (event) => {

    event.preventDefault();
    event.stopPropagation();

    const { username, email, password, passwordConfirmation} = this.state;
    const data = {
      "type": "users",
      "attributes": {
        username: username,
        email: email,
        password: password,
        "password-confirmation": passwordConfirmation,
      },
    };

    post('http://localhost:4000/api/register', {data})
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
              Username
              <input
                className="input ba w-100 pa2 normal f5"
                type="text"
                required={true}
                value={this.state.username}
                onChange={(e) => {this.setState({username: e.target.value})}}
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

export default Signup;
