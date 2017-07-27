import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { jsonApi } from '../actions';

class FeedDetailsPage extends Component {

  async componentDidMount() {
    const {
      handleJsonApiResponse
    } = this.props;
    const result = await axios.get(`subscriptions`);
    console.log("raw subscriptions result: ", result.data)
    handleJsonApiResponse(result.data);
  }

  render() {

    if(!this.props.subscriptions) {
      return (
        <div>Loading Subscriptions...</div>
      );
    }

    return (
      <div>
        {this.props.subscriptions.map(x => <div>Subscription: {x}</div>)}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    subscriptions: state.api.getIn(['subscription']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleJsonApiResponse: (response) => {
      dispatch(jsonApi(response))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedDetailsPage);
