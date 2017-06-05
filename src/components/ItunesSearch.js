import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { searchTerm, searchResults } from '../actions'
import SearchResultListItem from './SearchResultListItem';

function ItunesSearch({
  className,
  entity = 'podcast',
  onChange,
  searchTerm,
  searchResults,
  setSearchTerm,
  setSearchResults,
}) {
  async function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const result = await axios.get(
      `/search?term=${searchTerm}`,
    );
    setSearchResults(result.data.results);
    console.log('search result: ', result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}
        className="flex"
      >
        <input type="text"
          className="flex-auto bw1 h2 b--black b--solid"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <input type="submit"
          value="Search"
          className="bg-transparent bw1 h2 b--black b--solid pointer ml2 mb4"
        />
      </form>
      {searchResults.map((item, idx) => 
        <SearchResultListItem key={idx}
          data={item}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    searchTerm: state.search.get('term'),
    searchResults: state.search.get('results'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchTerm: (term) => {
      dispatch(searchTerm(term))
    },
    setSearchResults: (results) => {
      dispatch(searchResults(results))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItunesSearch);
