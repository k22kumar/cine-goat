import React, { Component } from 'react';

// this class is to show a potential movie result and show to screen
class MovieResult extends Component {
  constructor() {
    super();
  }

  // defered function to pass movie titles from input to main App
  deferedAddMovie = (e) => this.props.addMovieHandler(this.props.title, this.props.image, this.props.description);

  deferredInfo = (title, description, image) => {
    this.props.infoHandler(title, description, image);
  }

  render() {
    return (
      <li className="movieResult">
        <button className="resultPoster"
          onClick={() => this.deferredInfo(this.props.title, this.props.description, this.props.image)}>
          <div className="viewInfo"><p>View Info</p></div>
          <img src={this.props.image} alt={this.props.title} />
        </button>
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