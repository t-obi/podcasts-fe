import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Immutable from 'immutable';
import { Arrow } from 'reline';
import { Link } from 'react-router';
import Modal from 'react-modal';

import { jsonApi, jsonApiDelete } from '../actions';
import ListItemEpisode from './ListItemEpisode';

class PlaylistPage extends Component {

  async componentDidMount() {
    const {
      handleJsonApiResponse,
      routeParams,
    } = this.props;
    const result = await axios.get(`playlists/${routeParams.id}`);
    console.log("raw playlists result: ", result.data)
    handleJsonApiResponse(result.data);
  }

  async componentDidUpdate(prevProps) {
    if(this.props.items !== prevProps.items) {
      const missingEpisodes = this.props.items.reduce((acc, current) => {
        if(this.props.episodes.has(current)) {
          return acc;
        }
        return acc.push(current)
      }, new Immutable.List());
      console.log('missing episodes: ', missingEpisodes.toJS());
      if(!missingEpisodes.isEmpty()) {
        const result = await axios.get(`episodes?filter[id]=${missingEpisodes.join(',')}`)
        this.props.handleJsonApiResponse(result.data);
      }
    }
  }

  render() {
    const { playlist, items, episodes } = this.props;

    return (
      <div>
        <h4 className="mt0 h2 flex items-center">
          {playlist.get('title')}
        </h4>
        {items.map(episodeId =>
          <ListItemEpisode key={episodeId} id={episodeId} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const playlistId = ownProps.routeParams.id;
  const playlist = state.api.getIn(['playlist', playlistId], new Immutable.Map());
  const items = state.api.get('playlist-item', new Immutable.Map())
    .filter(x => x.get('playlist-id') == playlistId)
    .map(x => x.get('episode-id'));
  const episodes = items.reduce((acc, episodeId) => {
    console.log('episode-id: ', episodeId);
    const episode = state.api.getIn(['episode', '' + episodeId])
    console.log('episode: ', episode && episode.toJS());
    if(episode) {
      return acc.set(episodeId, episode);
    }
    return acc;
  }, new Immutable.Map());

  return {
    playlist,
    items,
    episodes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleJsonApiResponse: (response) => {
      dispatch(jsonApi(response))
    },
    confirmDelete: (id) => {
      dispatch(jsonApiDelete('playlist', id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);
