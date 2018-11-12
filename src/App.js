import React, { Component } from "react";
import { colors } from "data";

import styles from "./App.module.scss";

class App extends Component {
  state = { color: "", bgColor: "" };

  onInputChange = e => this.setState({ color: e.target.value });

  onColorSampleChange = e => this.setState({ bgColor: `${e.target.value}80` });

  onSubmit = e => {
    e.preventDefault();
    const colorNames = colors().map(color => color.name);
    if (colorNames.indexOf(this.state.color) !== -1) {
      console.log(this.state.color);
      const hexColor = colors().find(color => this.state.color === color.name)
        .hex;
      const bgColor = `#${hexColor}80`;
      this.setState({ bgColor });
    }
  };

  render() {
    return (
      <div className={styles.app} style={{ background: this.state.bgColor }}>
        <h3>Choose background color</h3>
        <form className={styles.colorPickerForm} onSubmit={this.onSubmit}>
          <input
            list="colors"
            type="color"
            className={styles.colorSampleInput}
            onChange={this.onColorSampleChange}
          />
          <datalist id="colors">
            {colors().map((color, i) => (
              <option key={i} value={color.name} />
            ))}
          </datalist>
          <input
            list="colors"
            className={styles.colorInput}
            placeholder="Start typing the color..."
            onChange={this.onInputChange}
          />
          <datalist id="colors">
            {colors().map((color, i) => (
              <option key={i} value={color.name}>
                {color.name}
              </option>
            ))}
          </datalist>
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
