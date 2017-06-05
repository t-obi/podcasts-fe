import React from 'react';

function SearchResultListItem({ data: {
  trackName,
  artistName,
  artworkUrl30,
  artworkUrl60,
  artworkUrl100,
  artworkUrl600,
  feedUrl,
  genres,
} }) {
  return <div className="mt2 pa2 b--gray b-dotted ba flex">
    {artworkUrl100 && <img src={artworkUrl100}
      alt=""
      className="flex-none mr2 "
    />}
    <div className="flex-auto">
      <div className="fw6">
        {trackName}
      </div>
    </div>
  </div>;
}

export default SearchResultListItem;
