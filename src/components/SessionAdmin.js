import React, { Component } from 'react';
import axios from 'axios';

class SessionAdmin extends Component {

  state = {
    sessions: [],
  };

  async componentDidMount() {
    const sessions = await axios.get('sessions');
    // console.log('sessions result: ', sessions);
    this.setState({
      sessions: sessions.data.data
    });
  }

  render() {
    return (
      <div>
        this will display a list of all sessions

        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>email</th>
              <th>session</th>
              <th>created at</th>
              <th>expires at</th>
            </tr>
          </thead>
          <tbody>
            {this.state.sessions.map((session, idx) =>
              <tr key={idx}>
                <td>{session.id}</td>
                <td>{session.user.email}</td>
                <td>{session.token}</td>
                <td>{session.createdAt}</td>
                <td>{session.expiresAt}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SessionAdmin;
