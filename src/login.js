import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { post } from './api';
import axios from 'axios';

class Login extends Component {

  state = {
    email: '',
    password: '',
  }

  static contextTypes = {
    session: React.PropTypes.object,
    handleSessionChange: PropTypes.func,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const { email, password } = this.state;
    const session = {
      email: email,
      password: password,
    };

    axios.post('/sessions', { session })
      .then((response) => {
        console.log(response);
        this.context.handleSessionChange({
          isLoggedIn: true,
          token: response.data.data.token,
          email: response.data.data.email,
          expiresAt: '1234567',
          id: response.data.data.id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    // post('http://localhost:4000/api/v1/sessions', { session })
    //   .then(result => {
    //     this.context.handleSessionChange({
    //       isLoggedIn: true,
    //       ...result,
    //     })
    //   })
    //   .catch(error => {
    //     console.log('login error: ', error);
    //   })
  }

  render() {

    return (
      <div>
        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
        <form onSubmit={this.handleSubmit}>
          <fieldset className="b--transparent ph0 mh0">
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
                className="input ba w-100 pa2 normal f5 b"
                type="password"
                required={true}
                value={this.state.password}
                onChange={(e) => {this.setState({password: e.target.value})}}
              />
            </label>
          </fieldset>
          <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow f6 dib"
            type="submit"
          >
            Sign in
          </button>
          <div className="lh-copy mt3 ml1">
            <Link className="f6 link dim black db" to="/register">Register</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
