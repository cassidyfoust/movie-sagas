import React, { Component } from 'react';
import './App.css';
import MovieList from '../MovieList/MovieList.js'

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <h1>Movies 2 Go</h1>
        <MovieList/>
      </div>
    );
  }
}

export default App;
