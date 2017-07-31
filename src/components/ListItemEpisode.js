import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { Arrow } from 'reline';
import axios from 'axios';

import { jsonApi } from '../actions';
import PlaylistPicker from './PlaylistPicker';

class ListItemEpisode extends Component {

  state = {
    showPlaylistPicker: false,
  };

  handlePlaylistAdd = async playlistId => {
    console.log('add to playlist: ', playlistId);
    console.log('with episode id: ', this.props.episode.toJS());
    const data = {
      "data": {
        type: "playlist_item",
        "attributes": {
          "playlist_id": playlistId,
          "episode_id": this.props.episode.get('id'),
        }
      }
    };
    const result = await axios.post('playlist_items', data);
    this.props.handleJsonApiResponse(result.data);

    this.setState({ showPlaylistPicker: false });
  }

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
        {this.state.showPlaylistPicker
          ? <PlaylistPicker playlists={this.props.playlists}
              onPick={this.handlePlaylistAdd} 
            />
          : <button onClick={() => this.setState({showPlaylistPicker: true})}
              className="b--none white bg-light-red pv2 ph3 mv2 dim pointer ttu"
            >
              Add to Playlist
            </button>
        }
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
    episode: state.api.getIn(['episode', '' + ownProps.id]),
    playlists: state.api.getIn(['playlist']),
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

