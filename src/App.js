import React, { Component } from "react";
import { colors } from "data";

import styles from "./App.module.scss";

class Autocomplete extends Component {
  render() {
    return (
      <fieldset>
        <input
          list="colors"
          className={styles.colorInput}
          placeholder="Start typing the color..."
          onChange={this.props.onChange}
        />
        <datalist id="colors">
          {colors().map((color, i) => (
            <option key={i} value={color.name}>
              {color.name}
            </option>
          ))}
        </datalist>
      </fieldset>
    );
  }
}

class App extends Component {
  state = { color: '', bgColor: '' };

  onInputChange = e => this.setState({ color: e.target.value });

  onColorSampleChange = e => this.setState({ bgColor: `${e.target.value}80` });

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    console.log(e.target.value);
    if (this.state.color) {
      const hexColor = colors().find(color => this.state.color === color.name).hex;
      const bgColor = `#${hexColor}80`;
      this.setState({ bgColor });
    } 
    // const hexColor = colors().find(color => this.state.color === color.name)
    //   .hex;
    // // const bgColor = `#${hexColor}80`;
    // this.setState({ bgColor });
  };

  render() {
    return (
      <div className={styles.app} style={{ background: this.state.bgColor }}>
        <h3>Choose background color</h3>
        <form className={styles.colorPickerForm} onSubmit={this.onSubmit}>
          <fieldset>
            <input list="colors" type="color" onChange={this.onColorSampleChange} />
            <datalist id="colors">
              {colors().map((color, i) => (<option key={i} value={color.name} />))}
            </datalist>
          </fieldset>
          <Autocomplete onChange={this.onInputChange} />
          <button
            type="submit"
            className={styles.submitColor}
            onClick={this.onSubmit}
          >
            Accept
          </button>
        </form>
      </div>
    );
  }
}

export default App;
