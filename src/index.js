import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Register from './register';
import Login from './login';
import Home from './home';
import AdminContainer from './AdminContainer';
import UsersAdmin from './UsersAdmin';
import SessionAdmin from './SessionAdmin';
import './index.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import axios from 'axios';

const session = JSON.parse(localStorage.getItem('session'));

function validateLoggedIn(nextState, replace, callback) {
  console.log('session: ', session);
	if (!(session && session.isLoggedIn)) {
			console.log('not logged in, redirect!');
      replace(`/login`);
    }
    callback();
}

axios.defaults.baseURL = 'http://localhost:4000/api/v1';
axios.defaults.headers.common['Authorization'] = `Token token=${session.token}`;

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Home}/>
    	<Route path="register" component={Register} />
      <Route path="login" component={Login} />
      <Route path="admin" component={AdminContainer} onEnter={validateLoggedIn}>
        <Route path="users" component={UsersAdmin} />
    	  <Route path="sessions" component={SessionAdmin} />
      </Route>
    </Route>
  </Router>
), document.getElementById('root'));
