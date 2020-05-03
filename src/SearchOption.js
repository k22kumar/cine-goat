import React, { Component } from "react";
// this component will handle adding a new movie option to the database

class SearchOption extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
    };
  }

  // function to handle userInput and store potential movie titles into state
  handleUserInput = (e) => {
    this.setState({
      userInput: e.target.value,
    });

    this.state.userInput === "" ?
    this.props.noInputHandler() :
    this.props.inputHandler(this.state.userInput);
  };

  //defered function to show the window, it takes a boolean value to update the state in App
  deferedShowResults = (e, boolValue) => {this.props.showResultsHandler(boolValue)};

  render() {
    return (
      <div className="searchOptionContainer">
        <label htmlFor="movieOption" className="visuallyHidden">
          Search for a movie
        </label>
        <input
          type="text"
          name="movieOption"
          onFocus={(e) => this.deferedShowResults(e, true)}
          onChange={this.handleUserInput}
          placeholder="Search for a movie"
        />
        <p>
          <i class="fas fa-search"></i>
        </p>
      </div>
    );
  }
}

export default SearchOption;
