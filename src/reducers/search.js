import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
	term: '',
	results: [],
});

const search = (state = defaultState,
  { type, term, results }) => 
{
  switch (type) {
    case 'SET_SEARCH_TERM':
      return state.set('term', term);

    case 'SET_SEARCH_RESULTS':
      return state.set('results', results);

    default:
      return state
  }
}

export default search;
