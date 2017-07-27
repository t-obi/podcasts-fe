import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Immutable from 'immutable';
import { Arrow } from 'reline';
import { Link } from 'react-router';

import { jsonApi } from '../actions';

class SubscriptionsPage extends Component {

  async componentDidMount() {
    const {
      handleJsonApiResponse
    } = this.props;
    const result = await axios.get(`subscriptions`);
    console.log("raw subscriptions result: ", result.data)
    handleJsonApiResponse(result.data);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.subscriptions !== this.props.subscriptions) {
      const missingFeeds = this.props.subscriptions.toList()
        .filter(x => {
          const feedId = x.get('feed-id');
          return !(this.props.subscribedFeeds && this.props.subscribedFeeds.has(feedId));
        })
        .map(x => x.get('feed-id'));
      console.log('missing feeds: ', missingFeeds.toJS());
      missingFeeds.forEach(async x => {
        const result = await axios.get(`feeds/${x}`);
        this.props.handleJsonApiResponse(result.data);
      })
    }
  }

  render() {

    if(!this.props.subscriptions) {
      return (
        <div>Loading Subscriptions...</div>
      );
    }
    return (
      <div>
        {this.props.subscribedFeeds.map((x, key) => <div className="ma3 ba b--dotted pa3">
          {!x
            ? <div> Loading Details...</div>
            : <div className="cf">
                <h4 className="mt0 h2 flex items-center">
                  <Link to={`feeds/${x.get('feed-id')}`}>{x.get('title')}</Link>
                  <a href={x.get('link')}>
                    <Arrow className="h-100 ml2 light-red dim" />
                  </a>
                </h4>
                <img src={x.get('image-url')}
                  alt=""
                  className="h4 w4 fl mr2 mb2"
                />
                <div>{x.get('description')}</div>
              </div>
          }
        </div>)}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const subscriptions = state.api.getIn(['subscription'], new Immutable.List());
  return {
    subscriptions: subscriptions,
    subscribedFeeds: subscriptions.map((x) =>
      state.api.getIn(['feed', '' + x.get('feed-id')], new Immutable.Map())
      .set('feed-id', x.get('feed-id'))
    ),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleJsonApiResponse: (response) => {
      dispatch(jsonApi(response))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsPage);
