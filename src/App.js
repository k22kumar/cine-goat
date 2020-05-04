import React, { Component } from "react";
import "./App.scss";
import SearchOption from "./SearchOption";
import MovieOption from "./MovieOption";
import firebase from "./firebase";
import axios from "axios";
import ResultScreen from "./ResultScreen";
import MovieResult from './MovieResult';


//TO MARKER , I am having issues updating the search results LIVE when a movie is added to the movieOptions. It looks like my results array state is being updated when I add movies, but I dont understand why my new search results are not rendering new MovieResults when the results state is updated. 

// Also why is it when search is focused, my gallery results seem to have its width shrunk for some reason?
class App extends Component {
  constructor() {
    //put all the movie options in an array and map over them
    super();
    this.state = {
      movieOptions: [],
      userInput: "enter a movie",
      showResults: false,
      resultsMessage: "Type a movie to Search!",
      results: [],
      movieOptionTitles:[]
    };
  }

  componentDidMount() {
    //set up listener to database
    const dbRef = firebase.database().ref();
    dbRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const movieArray = [];
      const titlesArray = [];
      for (let key in data) {
        movieArray.push(
          {
            movieTitle: data[key].title,
            movieID: key,
            image: data[key].image,
            votes: data[key].votes
          }
        )
        titlesArray.push(data[key].title);
      }
      // forEach ()

      if(this.state.results.length>0) {
        const newResults = this.state.results.filter((result) => {
          return !this.state.movieOptionsTitles.includes(result.title);
        })
          this.setState({results: newResults});
      }

      // update the movie state array
      //we are storing the titles array in a seperate array so that we can check later using 
      // .includes if the movie is already an option 

      //sort movies by votes

      movieArray.sort((a, b) => b.votes - a.votes);

      this.setState({
        movieOptions: movieArray,
        movieOptionsTitles: titlesArray
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
        page: 1
        
      },
    }).then((response) => {
      const theResponse = response;
      response.data.results.length === 0 ?
        this.setState({resultsMessage: "Sorry no results :("}) :
        this.resultsHandler(theResponse.data.results, movieDBURL, baseImageURL, userInput);
    });
  };

  resultsHandler = (response, movieDBURL, baseImageURL, userInput) => {
    const movieResults =[]


    response.forEach((movie) => {
        if (!this.state.movieOptionsTitles.includes(movie.title) && movie.poster_path != null){
          const movieImg = `${baseImageURL}${movie.poster_path}`;
          const newMovie = {
            title: movie.title,
            image: movieImg
          };
          movieResults.push(newMovie);
        }
    });
    this.setState({ results: movieResults });

  }

  noResultsToShow = () => {this.setState({resultsMessage: "Sorry, no matches :("})};


  addMovieHandler = (movieTitle, poster) => {
    const dbRef = firebase.database().ref();
          const newMovie = {
            title: movieTitle,
            votes: 0,
            image: poster,
          };
          dbRef.push(newMovie);
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
    return (
      <div className="App">
        <header>
        <h1 className="mainTitle">cinegoat</h1>
        <p className="description">An app that tracks the best movie!</p>
          <SearchOption
            showResultsHandler={this.showResultsHandler}
            noInputHandler={this.noInputHandler}
            inputHandler={this.inputHandler}
          />
          {this.state.showResults && (
            <ResultScreen
              results={this.state.results}
              resultsMessage={this.state.resultsMessage}
              showResultsHandler={this.showResultsHandler}
            >
              {this.state.results.map((movieResult, i) => {
                const { image, title, votes } = movieResult;
                
                return (
                  <MovieResult
                    key={i}
                    title={title}
                    votes={votes}
                    image={image}
                    addMovieHandler={this.addMovieHandler}
                  />
                );
              })}
            </ResultScreen>
          )}
        </header>
        <main>
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
        </main>
      </div>
    );
  }
}

export default App;
