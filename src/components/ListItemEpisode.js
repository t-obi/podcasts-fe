import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { Arrow } from 'reline';

import { jsonApi } from '../actions';

class ListItemEpisode extends Component {

  render() {
    const { episode } = this.props;
    if(!episode) {
      return null;
    }

    return (
      <div className="mv3 pa3 ba b--dotted">
        <h4 className="mt0 h2 flex items-center">
          {episode.get('title')}
          <a href={episode.get('link')}>
            <Arrow className="h-100 ml2 light-red dim" />
          </a>
        </h4>
        <audio className="w-100"
          src={episode.get('enclosure')}
          preload="none"
          controls
        />
        <div dangerouslySetInnerHTML={
          {__html: episode.get('description')}
        } />
        <div dangerouslySetInnerHTML={
          {__html: episode.get('content-encoded')}
        } />
        <div dangerouslySetInnerHTML={
          {__html: episode.get('itunes-summary')}
        } />
        <div className="f6 mt3">
          {format(episode.get('pubDate'), 'YYYY-MM-DD')}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    episode: state.api.getIn(['episode', ownProps.id]),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleJsonApiResponse: (response) => {
      dispatch(jsonApi(response))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItemEpisode);

