import React from 'react';

function PlaylistPicker({ playlists, onPick }) {
  console.log('playlists: ', playlists && playlists.toJS());
  if(!playlists) { return null; }
  const keys = playlists.keySeq();

  return <ul className="list pl0 mv0">
    {keys.map(key => <li key={key} className="dib">
      <button onClick={() => onPick(key)}
        className="b--none white bg-light-red pv2 ph3 mv2 dim pointer ttu mr2"
      >
        {playlists.getIn([key, 'title'])}
      </button>
    </li>)}
  </ul>
};

export default PlaylistPicker;
