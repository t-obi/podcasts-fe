import React, { Component } from 'react';
import ItunesSearch from './ItunesSearch';

class Home extends Component {
  render() {
    return (
      <div>
        <p className="App-intro">
          Welcome! This will become a startpage at some point.
        </p>
        <ItunesSearch />
      </div>
    );
  }
}

export default Home;
