import React, { Component } from "react";

import styles from "./Autocomplete.module.scss";

class Autocomplete extends Component {
  state = { color: "", bgColor: "" };

  onInputChange = e => this.setState({ color: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const hexColor = this.props.suggestions.find(
      color => this.state.color === color.name
    ).hex;
    const bgColor = `#${hexColor}80`;
    this.setState({ bgColor });
  };

  render() {
    return (
      <div className={styles.app} style={{ background: this.state.bgColor }}>
        <h3>Choose background color</h3>
        <form className={styles.colorPickerForm} onSubmit={this.onSubmit}>
          <input
            list="colors"
            className={styles.colorInput}
            placeholder="Start typing the color..."
            onChange={this.onInputChange}
          />
          <datalist id="colors">
            {this.props.suggestions.map((color, i) => (
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

export default Autocomplete;
