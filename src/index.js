import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import axios from 'axios';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducers from './reducers';
import App from './components/App';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import AdminContainer from './components/AdminContainer';
import UsersAdmin from './components/UsersAdmin';
import FeedsAdmin from './components/FeedsAdmin';
import NotFound from './components/NotFound';
import UnknownError from './components/UnknownError';
import FeedDetailsPage from './components/FeedDetailsPage';
import SubscriptionsPage from './components/SubscriptionsPage';

const session = JSON.parse(localStorage.getItem('session'));

function validateLoggedIn(nextState, replace, callback) {
  console.log('session: ', session);
	if (!(session && session.isLoggedIn)) {
			console.log('not logged in, redirect!');
      replace(`/login`);
    }
    callback();
}

axios.interceptors.response.use(response => response,
  error => {
    console.log('received error: ', error);
    return Promise.reject(error);
    // switch(error.response.status) {
    //   case 401:
    //   browserHistory.push('/unauthorized');
    //   return Promise.reject(error);
    //   case 404:
    //   browserHistory.push('/notfound');
    //   return Promise.reject(error);
    //   default:
    //   browserHistory.push('/error', error.response.data.errors);
    //   return Promise.reject(error);
    // }
});

axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;
if(session && session.token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${session.token}`;
}

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="signup" component={Signup} />
        <Route path="login" component={Login} />
        <Route path="unauthorized" component={Login} />
        <Route path="notfound" component={NotFound} />
        <Route path="error" component={UnknownError} />
        <Route path="feeds/:id" component={FeedDetailsPage} />
        <Route path="subscriptions" component={SubscriptionsPage} />
        <Route path="admin" component={AdminContainer} onEnter={validateLoggedIn}>
          <Route path="users" component={UsersAdmin} />
          <Route path="feeds" >
            <IndexRoute component={FeedsAdmin} />
            <Route path=":id" component={FeedDetailsPage} />
          </Route>
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
