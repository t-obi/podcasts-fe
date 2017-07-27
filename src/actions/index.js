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
    included: response.included
  }
}

export const jsonApiDelete = (type, id) => {
  console.log('in jsonapi delete action dispatcher...');
  return {
    type: 'REMOVE_ENTITY',
    entity_type: type,
    entity_id: id,
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
