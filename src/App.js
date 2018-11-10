import React, { Component } from 'react';
import { colors } from 'data';

import styles from './App.module.scss';

class Autocomplete extends Component {
  render() {
    return (
      <>
        <input
          list="colors"
          className={styles.colorInput}
          placeholder="Start typing the color..."
          onChange={this.props.onChange}
        />
        <datalist id="colors">
          {colors().map((color, i) => <option key={i} value={color.name}>{color.name}</option>)}
        </datalist>
      </>
    );
  }
}

class App extends Component {
  state = { color: '', bgColor: '' }

  onInputChange = e => this.setState({ color: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const hexColor = colors().find(color => this.state.color === color.name).hex;
    const bgColor = `#${hexColor}80`;
    this.setState({ bgColor });
  }

  render() {
    return (
      <div className={styles.app} style={{background: this.state.bgColor}}>
        <h3>Choose background color</h3>
        <form
          className={styles.colorPickerForm}
          onSubmit={this.onSubmit}
        >
          <Autocomplete onChange={this.onInputChange}/>
          <button
            type="submit"
            className={styles.submitColor}
            onClick={this.onSubmit}
          >
            Accept
          </button>
        </form>
        <p>Color name: {this.state.color}</p>
      </div>
    );
  }
}

export default App;
