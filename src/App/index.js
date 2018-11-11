import React, { Component } from 'react';
import { colors } from 'data';
import Autocomplete from 'App/Autocomplete';

// import styles from './App.module.scss';


class App extends Component {
  render() {
    const suggestions = colors().map(color => color.name);
    return (
      <Autocomplete suggestions={suggestions}/>
    );
  }
}

export default App;
