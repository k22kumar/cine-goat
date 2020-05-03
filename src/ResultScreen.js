import React, { Component } from 'react';
import MovieResult from './MovieResult.js';


class ResultScreen extends Component {
    constructor() {
        super();
        this.state = {
            message: "No results found :("
        }
    }


    render() {
      console.log("receivedMessage", this.props.resultsMessage)
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
                { console.log("sup", this.props.results)}
              {this.props.children }
            </ul>
          </div>
        );
    }
}

export default ResultScreen;