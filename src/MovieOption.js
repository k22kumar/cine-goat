import React, { Component } from "react";
import tempImg from "./assets/temp.jpg";
import firebase from "./firebase";

class MovieOption extends Component {

  constructor() {
    super();

    this.state = {
      likePressed: false,
      dislikePressed: false
    };
  }

  deferredLike = (e, key) => {
    this.props.voteHandler(e, key, 1);
  }

  deferredDislike = (e, key) => {
    this.props.voteHandler(e, key, -1);
  }


    render() {
      // you can create some logic here like adding a variable and then instead of putting className put a variable
      // console.log("props", this.props);
        return (
          <article className="movieOptionContainer">
              <p className="votes">Votes: {this.props.votes}</p>
            <ul className="imgAndLikes">
              <li className="movieImg">
                <img
                  src={this.props.image}
                  alt={"Movie poster for: " + this.props.movieTitle}
                />
              </li>
              <li className="likeAndDislike">
                {/* put a turnerary that decides if it has been clicked then unclick dislike inside the button itself since it is JSX*/}
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