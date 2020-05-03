import React, { Component } from 'react';

class MovieResult extends Component {
  constructor() {
    super();
  }

  // defered function to pass movie titles from input to main App
  deferedAddMovie = (e) => this.props.addMovieHandler(this.props.title, this.props.image);

  render() {
    return (
      <li className="movieResult">
        <div className="resultPoster">
          <img src={this.props.image} alt={this.props.title} />
        </div>
        <button
          aria-label="Click here to add a movie option"
          onClick={this.deferedAddMovie}
          className="addToList"
        >
          Add Candidate <i className="fas fa-plus"></i>
        </button>
      </li>
    );
  }
}

export default MovieResult;