import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Immutable from 'immutable';

import { jsonApi, jsonApiDelete } from '../actions';
import FeedDetails from './FeedDetails';
import ListItemEpisode from './ListItemEpisode';

class FeedDetailsPage extends Component {

  async componentDidMount() {
    const {
      routeParams,
      handleJsonApiResponse
    } = this.props;
    const result = await axios.get(`feeds/${routeParams.id}`);
    handleJsonApiResponse(result.data);

    const subscriptions = await axios.get(`subscriptions`);
    handleJsonApiResponse(subscriptions.data);
  }

  render() {

    if(!this.props.feed) {
      return (
        <div>Loading Feed...</div>
      );
    }

    const episodeIds = this.props.feed.getIn([
      'relationships',
      'episodes',
    ], [])
    return (
      <div>
        <FeedDetails feed={this.props.feed}
          onUpdate={this.props.handleJsonApiResponse}
          onSubscribe={this.props.handleJsonApiResponse}
          onUnsubscribe={() => this.props.confirmUnsubscribe(this.props.subscriptionId)}
          id={this.props.routeParams && this.props.routeParams.id}
          subscribed={this.props.subscribed}
          subscriptionId={this.props.subscriptionId}
         />
        <h3 className="mt4">
          Episodes:
        </h3>
        {episodeIds.map(id =>
          <ListItemEpisode key={id} id={id} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const subscription = state.api.get('subscription', new Immutable.List()).find(x => x.get('feed-id') == ownProps.routeParams.id)

  return {
    feed: state.api.getIn(['feed', ownProps.routeParams.id]),
    subscribed: !!subscription,
    subscriptionId: subscription ? subscription.get('id') : null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleJsonApiResponse: (response) => {
      dispatch(jsonApi(response))
    },
    confirmUnsubscribe: (id) => {
      dispatch(jsonApiDelete('subscription', id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedDetailsPage);
