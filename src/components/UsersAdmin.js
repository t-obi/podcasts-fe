import React, { Component } from 'react';
import EntityList from './EntityList';

class UsersAdmin extends Component {

  render() {
    return (
      <EntityList entityType='user'
        endpoint='users'
        fields={[
          'email',
          'inserted-at',
        ]}
      />
    );
  }
}

export default UsersAdmin;
