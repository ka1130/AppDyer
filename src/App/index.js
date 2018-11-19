import React, { Component } from "react";
import FallbackList from './FallbackList'

import styles from "./App.module.scss";

class App extends Component {
  state = {
    colors: [],
    isFetching: false,
    userInput: "",
    bgColor: "",
    submitted: false
  };

  componentDidMount() {
    this.setState({ isFetching: true });
    const url = "https://www.mocky.io/v2/5a37a7403200000f10eb6a2d​";
    this.fetchColors(url);
  }

  fetchColors = url => {
    fetch(url)
      .then(response => response.json())
      .then(result => this.setState({ colors: result, isFetching: false }))
      .catch(error => console.error(error));
  };

  onInputChange = e => this.setState({ userInput: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { userInput, colors } = this.state;
    const colorNames = colors.map(color => color.name);
    if (colorNames.indexOf(userInput) !== -1) {
      const hexColor = colors.find(color => userInput === color.name).hex;
      const bgColor = `#${hexColor}80`;
      this.setState({ bgColor });
    }
  };

  renderAutosuggestions = suggestions => {
    if ('options' in document.createElement('datalist')) {
      return (
        <datalist id="colors">
          {suggestions.map((color, i) => (
            <option key={i} value={color.name}>
              {color.name}
            </option>
          ))}
        </datalist>
      );
    } else {
      return <FallbackList colors={suggestions} userInput={this.state.userInput} />;
    }
  };

  render() {
    const { bgColor, userInput, colors } = this.state;
    let previewColor = "";
    if (colors.find(el => el.name === userInput)) {
      previewColor = `#${colors.find(el => el.name === userInput).hex}`;
    }
    return (
      <div className={styles.app} style={{ background: bgColor }}>
        <h3>Choose background color</h3>
        <form className={styles.colorPickerForm} onSubmit={this.onSubmit}>
          <input
            list="colors"
            className={styles.colorInput}
            placeholder="Start typing the color..."
            onChange={this.onInputChange}
          />
          {this.renderAutosuggestions(colors)}
          <span
            className={styles.colorPreview}
            style={{ background: previewColor }}
          />
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
