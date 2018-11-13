import React, { Component } from "react";

import styles from "./App.module.scss";

class App extends Component {
  state = {
    colors: [],
    isFetching: false,
    colorChosen: "",
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

  onInputChange = e => {
    // e.preventDefault();
    this.setState({ colorChosen: e.target.value });
  };

  onInput = e => {
    console.log(e.target.value);
  };

  onSubmit = e => {
    e.preventDefault();
    const { colorChosen, colors } = this.state;
    const colorNames = colors.map(color => color.name);
    if (colorNames.indexOf(colorChosen) !== -1) {
      const hexColor = colors.find(
        color => colorChosen === color.name
      ).hex;
      const bgColor = `#${hexColor}80`;
      this.setState({ bgColor });
    }
  };

  render() {
    const { bgColor, colorChosen, colors } = this.state;
    let previewColor = "";
    if (colors.find(el => el.name === colorChosen)) {
      previewColor = `#${colors.find(el => el.name === colorChosen).hex}`;
    }
    return (
      <div className={styles.app} style={{ background: bgColor }}>
        <h3>Choose background color</h3>
        <form className={styles.colorPickerForm} onSubmit={this.onSubmit}>
          <input
            list="colors"
            className={styles.colorInput}
            placeholder="Start typing the color..."
            onInput={this.onInput}
            // change name of this event to sth more specific
            onChange={this.onInputChange}
          />
          <datalist id="colors">
            {colors.map((color, i) => (
              <option key={i} value={color.name}>
                {color.name}
              </option>
            ))}
          </datalist>
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
