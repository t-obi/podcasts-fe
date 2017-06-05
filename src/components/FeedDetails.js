import React, { PropTypes } from 'react';
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

function FeedDetails({ feed, id, onUpdate }) {

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
        Update now
      </button>
    </div>
  );
}

FeedDetails.propTypes = {
  feed: PropTypes.object,
  feedId: PropTypes.number,
}

export default FeedDetails;
