import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Register from './register';
import Home from './home';
import './index.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

function validateLoggedIn(nextState, replace, callback) {
	if (!localStorage.getItem('phoenixAuthToken')) {
			console.log('not logged in, redirect!');
      replace(`/register`);
    }
    callback();
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Home} onEnter={validateLoggedIn}/>
    	<Route path="register" component={Register} />
    </Route>
  </Router>
), document.getElementById('root'));
