import React, { Component } from 'react';

class MovieResult extends Component {
  constructor() {
    super();
  }


  render() {
    return (
      <li className="movieResult">
        <div className="resultPoster">
          <img src={this.props.image} alt={this.props.title} />
        </div>
        <button className="addToList">Add Candidate</button>
      </li>
    );
  }


  
}

export default MovieResult;