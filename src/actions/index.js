export const jsonApi = (response) => {

  if(Array.isArray(response.data)) {
    return {
      type: 'ADD_ENTITIES',
      entities: response.data,
    }
  }
  return {
    type: 'ADD_ENTITY',
    entity: response.data,
  }
}

export const searchTerm = (term) => {
  return {
    type: 'SET_SEARCH_TERM',
    term,
  }
}

export const searchResults = (results) => {
  return {
    type: 'SET_SEARCH_RESULTS',
    results,
  }
}
