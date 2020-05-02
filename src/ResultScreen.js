import React, { Component } from 'react';
import MovieResult from './MovieResult';


class ResultScreen extends Component {
    constructor(props) {
        super();
        this.state = {
            message: "No results found :(",
            results: props.results
        }
    }


    render() {
      console.log("receivedMessage", this.props.resultsMessage)
        return (
          <div className="resultsContainer">
            <div className="searchMessageContainer">
              <p className="message">{this.props.resultsMessage}</p>
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
                {"sup", console.log(this.state.results)}
              {this.state.results.map((movieResult, i) => {
                const { image, title, votes } = movieResult;
                console.log("yo",this.state.results);
                return(
                  <MovieResult
                  key={i}
                  title={title}
                  votes={votes}
                  image={image}
                  />
                )
              })}
            </ul>
          </div>
        );
    }
}

export default ResultScreen;