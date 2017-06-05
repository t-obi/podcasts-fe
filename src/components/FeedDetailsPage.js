import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { jsonApi } from '../actions';
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
          id={this.props.routeParams && this.props.routeParams.id}
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
  return {
    feed: state.api.getIn(['feed', ownProps.routeParams.id]),
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
