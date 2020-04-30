import React, { Component } from "react";
import "./App.scss";
import AddOption from "./AddOption";
import MovieOption from "./MovieOption";
import firebase from "./firebase";

class App extends Component {
  constructor() {
    //put all the movie options in an array and map over them
    super();
    this.state = {
      movieOptions: [],
      userInput: "enter a movie",
    };
  }

  componentDidMount() {
    //set up listener to database
    const dbRef = firebase.database().ref();
    dbRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const movieArray = [];
      for (let key in data) {
        movieArray.push(
          {
            movieTitle: data[key].title,
            movieID: key,
            image: data[key].image,
            votes: data[key].votes
          }
        )
      }
      // update the movie state array
      this.setState({
        movieOptions: movieArray
      })
    });
  }

  // helper methods
  addMovieHandler = (event, movieTitle) => {
    const dbRef = firebase.database().ref();
    event.preventDefault();
    if (this.state.userInput !== "") {
      // dynamically add variable names that equal the name of the movie
      // eval(`const ${movieTitle} = { vote: 0, image: ""} ;`)
      const newMovie = {
        title: movieTitle,
        votes: 1,
        image: ""
      }
      dbRef.push(newMovie);
      this.setState({
        userInput: "",
      });
    }
  }

  voteHandler = (event, key, voteToAdd) => {
    // go to key in database respreseinting the movie
    // update the vote b vote to add
    const dbRef = firebase.database().ref(key+"/votes");

    const newVotes = dbRef.votes;

    dbRef.transaction(function(currentVotes) {
      return currentVotes + voteToAdd;
    });
  }



  render() {
    return (
      <div className="App">
        <AddOption addMovieHandler={this.addMovieHandler}/>
        <ul className="movieGallery">
          {
            this.state.movieOptions.map((movie) => {
              const {movieID} = movie;
              return <MovieOption movieID={movieID} movieTitle={movie.title} votes={movie.votes} voteHandler={this.voteHandler}/>;
            })
          }
        </ul>
        
      </div>
    );
  }
}

export default App;
