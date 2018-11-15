import React, { Component } from "react";
import uuidv4 from "uuid/v4";

import styles from "./FallbackList.module.scss";

class FallbackList extends Component {
  state = { 
    colors: [],
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.colors !== prevState.colors) {
      return { colors: nextProps.colors };
    }

    if (nextProps.userInput !== prevState.userInput) {
      return { userInput: nextProps.userInput };
    }

    return null;
  }

  render() {
    console.log(this.state.userInput);
    return (
      <ul>
        <li>el</li>
      </ul>
    )
  }
}

export default FallbackList;
