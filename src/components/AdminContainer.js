import React, { Component } from 'react';

class AdminContainer extends Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default AdminContainer;
