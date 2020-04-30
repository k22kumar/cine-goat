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
  };

  // defered function to pass movie titles from input to main App
  deferedAddMovie = (e) => {
    console.log("userInputfromaddOption", this.state.userInput);
    this.props.addMovieHandler(e, this.state.userInput)
  }

  render() {
    return (
      <ul className="addOptionContainer">
        <li>
          <label htmlFor="movieOption">Add movie:</label>
          <input
            type="text"
            name="movieOption"
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
