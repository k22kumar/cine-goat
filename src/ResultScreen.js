import React, { Component } from 'react';


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
              <p className="message">{this.state.message}</p>
              <button className="close">
                <i className="far fa-times-circle"></i>
              </button>
            </div>
            <ul className="results"></ul>
          </div>
        );
    }
}

export default ResultScreen;