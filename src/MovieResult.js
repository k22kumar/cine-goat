import React from 'react';

const MovieResult = () => {
    return (
      <div>
        <div className="resultPoster">
          <img src={this.props.image} alt={this.props.movieTitle} />
        </div>
        <button className="addToList">Add</button>
      </div>
    );
}

export default MovieResult;