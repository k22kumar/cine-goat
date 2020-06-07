import React, { Component } from "react";

// this class represents the movie option you can vote for.
class MovieOption extends Component {

  constructor() {
    super();

    this.state = {
      likePressed: false,
      dislikePressed: false,
    };
  }

  deferredLike = (e, key) => {
    this.props.voteHandler(e, key, 1);
  }

  deferredDislike = (e, key) => {
    this.props.voteHandler(e, key, -1);
  }

  deferredInfo = (title, description, image) => {
    this.props.infoHandler(title, description, image);
  }

    render() {
        return (
          <article className="movieOptionContainer">
              <p className="votes">Votes: {this.props.votes}</p>
            <ul className="imgAndLikes">
              <li className="movieImg">
                <button className="movieImg"
                  onClick={() => this.deferredInfo(this.props.movieTitle, this.props.description, this.props.image)}>
                  <div className="viewInfo"><p>View Info</p></div>
                <img
                  src={this.props.image}
                  alt={"Movie poster for: " + this.props.movieTitle}
                />
              </button>
              </li>
              <li className="likeAndDislike">
                <button
                  className="like"
                  onClick={(e) => this.deferredLike(e, this.props.movieID)}
                >
                  <i className="fas fa-thumbs-up"></i>
                </button>
                <button
                  className="dislike"
                  onClick={(e) => this.deferredDislike(e, this.props.movieID)}
                >
                  <i className="fas fa-thumbs-down"></i>
                </button>
              </li>
            </ul>
          </article>
        );
    }
}

export default MovieOption;