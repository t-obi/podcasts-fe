import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

async function handleUpdate(feedId, onUpdate) {
  console.log('handle update..');
  const data = {
    "data": {
      "type": "feeds",
      "attributes": {
        "id": feedId,
      }
    }
  };

  const result = await axios.post(`update_feed`, data);
  console.log('result: ', result);

  onUpdate(result.data);
}

async function handleSubscribe(feedId, onSubscribe) {
  const data = {
    "data": {
      type: "subscription",
      "attributes": {
        "feed-id": feedId,
      }
    }
  };
  const result = await axios.post("subscriptions", data);
  console.log("subscribe result: ", result)
  onSubscribe(result.data)
}

async function handleUnsubscribe(subscriptionId, onUnsubscribe) {
  const result = await axios.delete(`subscriptions/${subscriptionId}`);
  console.log("unsubscribe result: ", result)
  onUnsubscribe(result.data)
}

function FeedDetails({
  feed,
  id,
  onUpdate,
  subscribed,
  subscriptionId,
  onSubscribe,
  onUnsubscribe,
}) {

  if(!feed) {
    return <div>Loading Feed....</div>
  }

  return (
    <div>
      <img src={feed.get('image-url')}
        className="w4 fl mr3"
        alt={feed.get('title')}
      />
      <h2>
        {feed.get('title')}
      </h2>
      <div className="f4">
        {feed.get('description')}
      </div>
      <div className="mv2">
        <a href={feed.get('link')}>{feed.get('link')}</a>
      </div>
      <div className="mv2">
        <a href={feed.get('source-url')}>
          {feed.get('source-url')}
        </a>
      </div>
      <div>
        Last Updated: {distanceInWordsToNow(
          feed.get('updated-at'),
          { addSuffix: true }
        )}
      </div>
      <button onClick={() => handleUpdate(id, onUpdate)}
        className="b--none white bg-light-red pv2 ph3 mt2 dim pointer ttu">
        Update
      </button>

      <button onClick={() => {
          subscribed
            ? handleUnsubscribe(subscriptionId, onUnsubscribe)
            : handleSubscribe(id, onUnsubscribe)
          }
        }
        className="b--none white bg-light-red pv2 ph3 mt2 dim pointer ttu ml2">
        {subscribed ? "Unsusbscribe" : "Subscribe"}
      </button>
    </div>
  );
}

FeedDetails.propTypes = {
  feed: PropTypes.object,
  feedId: PropTypes.number,
}

export default FeedDetails;
