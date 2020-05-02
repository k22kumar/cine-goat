import React, { Component } from "react";
// this component will handle adding a new movie option to the database

class AddOption extends Component {
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

  // defered function to pass movie titles from input to main App
  deferedAddMovie = (e) => this.props.addMovieHandler(e, this.state.userInput);

  //defered function to show the window, it takes a boolean value to update the state in App
  deferedShowResults = (e, boolValue) => {this.props.showResultsHandler(boolValue)};

  render() {
    return (
      <ul className="addOptionContainer">
        <li>
          <label htmlFor="movieOption">Add movie:</label>
          <input
            type="text"
            name="movieOption"
            onFocus={(e) => this.deferedShowResults(e, true)}
            onChange={this.handleUserInput}
          />
        </li>
        <li className="addButton">
          <button
            aria-label="Click here to add a movie option"
            onClick={this.deferedAddMovie}
          >
            <i className="fas fa-plus"></i>
          </button>
        </li>
      </ul>
    );
  }
}

export default AddOption;
