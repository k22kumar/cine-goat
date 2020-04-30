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
      console.log("the data: ")
      console.log(data);
      const movieArray = [];
      console.log("keys");
      for (let movie in data) {
        console.log(movie);
      }
    });
  }

  // helper methods
  addMovieHandler = (event, movieTitle) => {
    event.preventDefault();
    if (this.state.userInput !== "") {
      const dbRef = firebase.database().ref();
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

  render() {
    return (
      <div className="App">
        <AddOption addMovieHandler={this.addMovieHandler}/>
        <MovieOption />
      </div>
    );
  }
}

export default App;
