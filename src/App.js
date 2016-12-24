import React, { Component, PropTypes } from 'react';
import UserMenu from './UserMenu';
import { Link, browserHistory } from 'react-router';
import './App.css';
import 'tachyons'
import axios from 'axios';

function getInitialSession() {
  const session = JSON.parse(localStorage.getItem('session'));
  const fallback = {
    isLoggedIn: false,
  };
  return session || fallback;
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
    if(session.token) {
      axios.defaults.headers.common['Authorization'] = `Token token=${session.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
    browserHistory.push('/');
  }

  render() {
    return (
      <div className="App sans-serif">
        <header className="bg-dark-red w-100 ph3 pv3 pv4-ns ph4-m ph5-l z-1 top-0">
          <nav className="f6 fw6 ttu tracked">
            <Link className="link grow white dib" to="/">Podcasts</Link>
            <UserMenu session={this.state.session}/>
          </nav>
        </header>
        <main className="mv4 mw7-ns center pa3 ph5-ns">
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default App;
