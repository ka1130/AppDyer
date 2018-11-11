import React, { Component } from 'react';
import { colors } from 'data';
import Autocomplete from 'App/Autocomplete';

// import styles from './App.module.scss';

class App extends Component {
  render() {
    return (
      <Autocomplete suggestions={colors()}/>
    );
  }
}

export default App;
