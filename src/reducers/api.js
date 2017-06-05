import Immutable from 'immutable';

function getRelationships(data) {
  return data.map(type => type
    .get('data', new Immutable.List())
    .map(x => x.get('id'))
  );
}

function createEntity(data) {
  
  let result = Immutable.fromJS(data.attributes);

  if(data.relationships) {
    const relationships = getRelationships(
      Immutable.fromJS(data.relationships)
    ); 
    result = result.set('relationships', relationships);
  }
  console.log('createEntity result: ', result);
  return result;
}

const api = (state = new Immutable.Map(), {type, ...data}) => {
  switch (type) {
    case 'ADD_ENTITIES':
      const result = data.entities.reduce((accumulator, current) => {
        return accumulator.setIn([
          current.type,
          current.id,
        ], createEntity(current));
      }, new Immutable.Map());
      return state.mergeDeep(result);

    case 'ADD_ENTITY':
      const { id, ...entity } = data.entity;
      return state.setIn([entity.type, id], createEntity(entity));

    default:
      return state
  }
}

export default api;
