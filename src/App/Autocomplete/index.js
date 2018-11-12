import React, { Component } from "react";
import uuidv4 from "uuid/v4";

import styles from "./Autocomplete.module.scss";

class Autocomplete extends Component {
  state = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
    colorChosen: {}
  };

  onInputChange = e => {
    const userInput = e.currentTarget.value;
    let filteredSuggestions;

    if (userInput.length > 1) {
      filteredSuggestions = this.props.suggestions.filter(
        suggestion =>
          suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
    }

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onSuggestionClick = e => {
    const colorChosen = this.state.filteredSuggestions.find(suggestion => suggestion.name === e.target.innerText);
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      colorChosen
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const hexColor = this.state.colorChosen.hex;
    const bgColor = `#${hexColor}80`;
    this.setState({ bgColor });
  };

  renderSuggestionList = () => {
    const { showSuggestions, filteredSuggestions } = this.state;
    if (showSuggestions && filteredSuggestions) {
      return (
        <ul className={styles.suggestionList}>
          {filteredSuggestions.map(suggestion => (
            <li key={uuidv4()} onClick={this.onSuggestionClick}>{suggestion.name}</li>
          ))}
        </ul>
      );
    }
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
          {this.renderSuggestionList()}
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
