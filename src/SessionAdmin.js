import React, { Component } from 'react';
import { get } from './api';
class SessionAdmin extends Component {

  state = {
    sessions: [],
  };

  componentDidMount() {
    get('http://localhost:4000/api/v1/sessions')
      .then(result => {
        console.log('sessions result: ', result);
        this.setState({
          sessions: result.sessions
        });
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }

  render() {
    return (
      <div>
        this will display a list of all sessions

        <ul>
          {this.state.sessions.map(session => <li>session: {session.token}</li>)}
        </ul>
      </div>
    );
  }
}

export default SessionAdmin;
