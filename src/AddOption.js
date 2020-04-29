import React, { Component } from 'react';
// this component will handle adding a new movie option to the database

class AddOption extends Component {
    render() {
        return (
          <ul className="addOptionContainer">
            <li>
              <label htmlFor="movieOption">Add movie:</label>
              <input type="text" name="movieOption" />
            </li>
            <li className="addButton">
              <button aria-label="Click here to add a movie option">
                <i className="fas fa-plus"></i>
              </button>
            </li>
          </ul>
        );
    }
}

export default AddOption;