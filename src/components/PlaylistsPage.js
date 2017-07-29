import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Immutable from 'immutable';
import { Arrow } from 'reline';
import { Link } from 'react-router';
import Modal from 'react-modal';

import { jsonApi, jsonApiDelete } from '../actions';

class PlaylistsPage extends Component {

  state = {
    showAdd: false,
  };

  async componentDidMount() {
    const {
      handleJsonApiResponse
    } = this.props;
    const result = await axios.get(`playlists`);
    console.log("raw playlists result: ", result.data)
    handleJsonApiResponse(result.data);
  }

  handleAdd = async e => {
    e.preventDefault();
    console.log('add feed', this.state.playlistNameInput);
    const data = {
      "data": {
        type: "playlist",
        "attributes": {
          "title": this.state.playlistNameInput,
        }
      }
    };
    const result = await axios.post('playlists', data);
    this.props.handleJsonApiResponse(result.data);
  };

  handleDelete = async id => {
    const result = await axios.delete(`playlists/${id}`)
    this.props.confirmDelete(id);
  }

  render() {
    const { playlists } = this.props;
    if(!playlists) {
      return (
        <div>Loading Playlists...</div>
      );
    }
    const keys = playlists.keySeq();
    return (
      <div>
        {this.state.showAdd
          ? <form onSubmit={this.handleAdd}>
              <input className="pv2" 
                onChange={e => this.setState({
                  playlistNameInput: e.target.value,
                })}
              />
              <button type="submit"
                className="b--none white bg-light-red pv2 ph3 mt2 ml2 dim pointer ttu"
              >
                Add
              </button>  
            </form>
          : <button onClick={() => this.setState({showAdd: true})}
              className="b--none white bg-light-red pv2 ph3 mt2 dim pointer ttu"
            >
              Add
            </button>
          }
        {keys.map((key) => {
          const x = playlists.get(key);
          return <div key={key} className="mv3 ba b--dotted pa3">
            {<div className="cf">
                <h4 className="mt0 h2 flex items-center">
                  <Link to={`playlists/${key}`}>{x.get('title')}</Link>
                </h4>
                <button onClick={() => this.handleDelete(key)}
                  className="b--none white bg-light-red pv2 ph3 mt2 dim pointer ttu"
                >
                  Delete
                </button>
              </div>
            }
          </div>
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const playlists = state.api.getIn(['playlist'], new Immutable.List());
  return {
    playlists: playlists,
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsPage);
