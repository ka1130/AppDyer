import React, { Component } from 'react';
import { colors } from 'data';
import Autocomplete from 'App/Autocomplete';

class App extends Component {
  render() {
    return (
      <Autocomplete suggestions={colors()} />
    );
  }
}

export default App;
