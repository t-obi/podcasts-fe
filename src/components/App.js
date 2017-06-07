import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'tachyons'

import Header from './Header';
import { browserHistory } from 'react-router';

function getInitialSession() {
  const fallback = {
    isLoggedIn: false,
  };
  try {
    const session = JSON.parse(localStorage.getItem('session'));
    return session || fallback;
  } catch(error) {
    return fallback;
  }
}

class App extends Component {

  state = {
    session: getInitialSession(),
  };

  static childContextTypes = {
    session: PropTypes.shape({
      email: PropTypes.string,
      token: PropTypes.string,
      expiresAt: PropTypes.string,
      id: PropTypes.number,
      isLoggedIn: PropTypes.bool.isRequired,
    }),
    handleSessionChange: PropTypes.func,
  };

  getChildContext() {
    return {
      session: this.state.session,
      handleSessionChange: this.handleSessionChange,
    };
  }

  handleSessionChange = (session) => {
    console.log('handle session change: ', session);
    this.setState({
      session,
    });
    localStorage.setItem('session', JSON.stringify(session));
    axios.defaults.headers.common['Authorization'] = `Bearer ${session.token}`;
    browserHistory.push('/');
  }

  render() {
    return (
      <div className="App sans-serif">
        <Header session={this.state.session} />
        <main className="mv4 mw7-ns center pa3 ph5-ns">
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default App;
