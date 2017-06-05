import React from 'react';
import EntityList from './EntityList';
import AddFeed from './AddFeed';

class FeedsAdmin extends React.Component {

  render() {
    return (
      <div>
        <AddFeed />
        <EntityList entityType='feed'
            endpoint='feeds'
            fields={[
              'title',
              'source-url',
            ]}
            hasDetailsPage
          />
      </div>
    );
  }
}

export default FeedsAdmin;
