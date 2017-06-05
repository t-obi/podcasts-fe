import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import '../styles/header.css';
import axios from 'axios';

class UserMenu extends Component {

  static propTypes = {
    session: PropTypes.object,
  };

  static contextTypes = {
    handleSessionChange: PropTypes.func,
  };

  state = {
    isOpen : false,
  };

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleLogout = () => {
    axios.delete(`/sessions/${this.props.session.id}`)
      .then((response) => {
        console.log('logout response: ', response);
        if(response.status === 204) {
          console.log('hey');
          this.context.handleSessionChange({isLoggedIn: false});
        }
      })
      .catch(error => {
        console.log('already logged out');
        this.context.handleSessionChange({isLoggedIn: false});
      });
  }

  render() {
    if(!this.props.session.isLoggedIn) {
      return (
        <Link className="link grow white dib fr" to="/login">Login</Link>
      );
    }

    return (
      <div className="dib fr white relative pointer" onClick={this.toggleOpen}>
        {this.props.session.email}
        <div className="arrow-down dib white ml2" />
        <ul className={`absolute z5 bg-light-red top-2 right--2 ph4 list pv3 rotating-menu ${this.state.isOpen ? 'open' : ''} `} >
          <li className="pa2">
            <Link className="link grow white dib" to="/admin/users">User Admin</Link>
          </li>
          <li className="pa2">
            <Link className="link grow white dib" to="/admin/feeds">Feeds Admin</Link>
          </li>
          <li className="pa2 pointer grow" onClick={this.handleLogout}>Logout</li>
        </ul>
      </div>
    );
  }
}

export default UserMenu;
