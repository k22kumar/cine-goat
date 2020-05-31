import React, { Component } from 'react';

// this class is to hold movie results and display to screen
class ResultScreen extends Component {
    constructor() {
        super();
        this.state = {
            message: "No results found :("
        }
    }


    render() {
        return (
          <div className="resultsContainer">
            <div className="searchMessageContainer">
              <p className="message">Click "X" to close results</p>
              <button
                className="close"
                onClick={() => {
                  this.props.showResultsHandler(false);
                }}
              >
                <i className="far fa-times-circle"></i>
              </button>
            </div>
            <ul className="results">
              {this.props.children }
            </ul>
          </div>
        );
    }
}

export default ResultScreen;