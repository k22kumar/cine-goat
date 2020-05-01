import React, { Component } from "react";
import "./App.scss";
import AddOption from "./AddOption";
import MovieOption from "./MovieOption";
import firebase from "./firebase";
import axios from "axios";

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
  addMovieHandler = (event, userInput) => {
    
    
    const dbRef = firebase.database().ref();
    event.preventDefault();
    if (userInput !== "") {
      console.log("clicked for a movie");
      const apiKey = `ffb95a5b116cb8ae246c7c6f51c94ed6`;
      

      
      // make an api call to themovieDatabbase
      const movieDBURL = `https://api.themoviedb.org/3/search/movie?`;
      const baseImageURL = `https://image.tmdb.org/t/p/w500`;


      axios({
        url: movieDBURL,
        method: `GET`,
        responseType: `json`,
        params: {
          api_key: apiKey,
          query: userInput
        }
      }).then(
        (response) => {
          console.log(response.data.results[0]);
          console.log()
          response.data.results.length > 0 ?
          
          const movieImg = `${baseImageURL}${response.data.results[0].poster_path}`;
          const newMovie = {
            title: userInput,
            votes: 1,
            image: movieImg,
          };
          dbRef.push(newMovie);
          this.setState({
            userInput: ""
          });
        }
      )

      
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
            this.state.movieOptions.map((movie, i) => {
              const {movieID, movieTitle, votes, image} = movie;
              return <MovieOption key={i} movieID={movieID} movieTitle={movieTitle} image={image} votes={votes} voteHandler={this.voteHandler}/>;
            })
          }
        </ul>
        
      </div>
    );
  }
}

export default App;
