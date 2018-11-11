import React, { Component } from "react";
import uuidv4 from "uuid/v4";

import styles from "./Autocomplete.module.scss";

class Autocomplete extends Component {
  state = {
    color: "",
    bgColor: "",
    // The active selection's index
    activeSuggestion: 0,
    // The suggestions that match the user's input
    filteredSuggestions: [],
    // Whether or not the suggestion list is shown
    showSuggestions: false,
    // What the user has entered
    userInput: ""
  };

  // onInputChange = e => this.setState({ color: e.target.value });

  onInputChange = e => {
    const userInput = e.currentTarget.value;
    let filteredSuggestions;

    // Filter our suggestions that don't contain the user's input
    if (userInput.length > 1) {
      filteredSuggestions = this.props.suggestions.filter(
        suggestion =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
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
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  // onSubmit = e => {
  //   e.preventDefault();
  //   const hexColor = this.props.suggestions.find(
  //     color => this.state.color === color.name
  //   ).hex;
  //   const bgColor = `#${hexColor}80`;
  //   this.setState({ bgColor });
  // };

  renderSuggestionList = () => {
    const { showSuggestions, filteredSuggestions } = this.state;
    if (showSuggestions && filteredSuggestions) {
      return (
        <ul className={styles.suggestionList}>
          {filteredSuggestions.map(suggestion => (
            <li key={uuidv4()}>{suggestion}</li>
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
