import React, { Component } from 'react';


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
              <p className="message">{this.props.resultsMessage}</p>
              <button className="close" 
              onClick={() => {this.props.showResultsHandler(false)}}>
                <i className="far fa-times-circle"></i>
              </button>
            </div>
            <ul className="results"></ul>
          </div>
        );
    }
}

export default ResultScreen;