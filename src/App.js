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
      console.log(data);
      const movieArray = [];
      for (let key in data) {
      }
    });
  }

  render() {
    return (
      <div className="App">
        <AddOption />
        <MovieOption />
      </div>
    );
  }
}

export default App;
