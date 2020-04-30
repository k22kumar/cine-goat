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

  deferredLike = (e) => {
    this.props.voteHandler(e, this.props.id, 1);
  }

  deferredDislike = (e) => {
    this.props.voteHandler(e, this.props.id, -1);
  }


    render() {
      // you can create some logic here like adding a variable and then instead of putting className put a variable
        return (
          <ul className="movieOptionContainer">
            <li className="votes">
              <p>Votes: {this.props.votes}</p>
            </li>
            <li className="movieImg">
              <img src={tempImg} alt="a sample movie image" />
            </li>
            <li className="likeAndDislike">
            {/* put a turnerary */}
              <button className="like"
                 onClick={this.deferredLike}>
                <i className="fas fa-thumbs-up"></i>
              </button>
              <button className="dislike" onClick={this.deferredDislike}>
                <i className="fas fa-thumbs-down"></i>
              </button>
            </li>
          </ul>
        );
    }

}

export default MovieOption;