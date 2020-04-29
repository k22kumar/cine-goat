import React, { Component } from "react";
import tempImg from "./assets/temp.jpg";

class MovieOption extends Component {

    render() {
        return (
          <ul className="movieOptionContainer">
            <li className="votes">
              <p>Votes: 0</p>
            </li>
            <li className="movieImg">
              <img src={tempImg} alt="a sample movie image" />
            </li>
            <li className="likeAndDislike">
              <button className="like">
                <i className="fas fa-thumbs-up"></i>
              </button>
              <button className="dislike">
                <i className="fas fa-thumbs-down"></i>
              </button>
            </li>
          </ul>
        );
    }

}

export default MovieOption;