import React, { Component } from "react";
import tempImg from "./assets/temp.jpg";

class MovieOption extends Component {

  constructor() {
    super();
    this.state = {
      movieId: "",
      movieTitle: "",
      votes: "",
      image: ""
    };
  }



  vote = (voteToAdd) => {
      const dbRef = firebase.database().ref();
      import firebase from "./firebase";
  }

    render() {
        return (
          <ul className="movieOptionContainer">
            <li className="votes">
              <p>Votes: {this.props.votes}</p>
            </li>
            <li className="movieImg">
              <img src={tempImg} alt="a sample movie image" />
            </li>
            <li className="likeAndDislike">
              <button className="like" onClick={this.vote(1)}>
                <i className="fas fa-thumbs-up"></i>
              </button>
              <button className="dislike" onClick={this.vote(-1)}>
                <i className="fas fa-thumbs-down"></i>
              </button>
            </li>
          </ul>
        );
    }

}

export default MovieOption;