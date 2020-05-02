import React from 'react';

const MovieResult = () => {
    return (
      <div>
        <div className="resultPoster">
          <img src={this.props.image} alt={this.props.title} />
        </div>
        <button className="addToList">Add Candidate</button>
      </div>
    );
}

export default MovieResult;