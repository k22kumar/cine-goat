import React, { Component } from "react";
import "./App.scss";
import AddOption from "./AddOption";
import MovieOption from "./MovieOption";
import firebase from "./firebase";
import axios from "axios";
import ResultScreen from "./ResultScreen";

class App extends Component {
  constructor() {
    //put all the movie options in an array and map over them
    super();
    this.state = {
      movieOptions: [],
      userInput: "enter a movie",
      showResults: false,
      resultsMessage: "Type a movie to Search!",
      results: []
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


  noInputHandler = () => this.setState({resultsMessage: "Type a movie to search!"});

  inputHandler = (userInput) => {

    const dbRef = firebase.database().ref();
    const apiKey = `ffb95a5b116cb8ae246c7c6f51c94ed6`;

    // make an api call to themovieDatabbase
    const movieDBURL = `https://api.themoviedb.org/3/search/movie?`;
    //endpoint to movie poster path
    const baseImageURL = `https://image.tmdb.org/t/p/w500`;

    axios({
      url: movieDBURL,
      method: `GET`,
      responseType: `json`,
      params: {
        api_key: apiKey,
        query: userInput,
        total_results: 20,
      },
    }).then((response) => {
      // console.log(response.data.results);
      response.length === 0 ?
        this.setState({resultsMessage: "Sorry no results :("}) :
        this.resultsHandler(response, movieDBURL, baseImageURL, userInput);
        console.log("messagebeing SET: ", this.state.resultsMessage)
    });
  };

  resultsHandler = (response, movieDBURL, baseImageURL, userInput) => {
    console.log("resultsHandler: ", response);



    const movieImg = `${baseImageURL}${response.data.results[0].poster_path}`;
    const newMovie = {
      title: userInput,
      votes: 0,
      image: movieImg,
    };
  }

  noResultsToShow = () => {this.setState({resultsMessage: "Sorry, no matches :("})};









  addMovieHandler = (event, userInput) => {
    const dbRef = firebase.database().ref();
    event.preventDefault();
    if (userInput !== "") {
      console.log("clicked for a movie");
      const apiKey = `ffb95a5b116cb8ae246c7c6f51c94ed6`;
      
      // make an api call to themovieDatabbase
      const movieDBURL = `https://api.themoviedb.org/3/search/movie?`;
      //endpoint to movie poster path
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
          const movieImg = `${baseImageURL}${response.data.results[0].poster_path}`;
          const newMovie = {
            title: userInput,
            votes: 0,
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

  //this function will update state to show the results or not
  showResultsHandler = (boolValue) => this.setState({showResults: boolValue});

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
    console.log("resultsMessageBeinSent", this.resultsMessage);
    return (
      <div className="App">
        <AddOption
          showResultsHandler={this.showResultsHandler}
          addMovieHandler={this.addMovieHandler}
          noInputHandler={this.noInputHandler}
          inputHandler={this.inputHandler}
        />
        {this.state.showResults && <ResultScreen
        resultsMessage={this.state.resultsMessage} 
        showResultsHandler={this.showResultsHandler} />}
        <ul className="movieGallery">
          {this.state.movieOptions.map((movie, i) => {
            const { movieID, movieTitle, votes, image } = movie;
            return (
              <MovieOption
                key={i}
                movieID={movieID}
                movieTitle={movieTitle}
                image={image}
                votes={votes}
                voteHandler={this.voteHandler}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
