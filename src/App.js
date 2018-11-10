import React, { Component } from 'react';
import styles from './App.module.scss';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <h3>Choose background color</h3>
        <form className={styles.colorPickerForm}>
          <input
            type="text"
            className={styles.colorInput}
            placeholder="Start typing the color..."
          />
          <button
            type="submit"
            className={styles.submitColor}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default App;
