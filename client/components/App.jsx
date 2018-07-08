import React from 'react';

import Player from './Player.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Player />
      </div>
    );
  }
}
