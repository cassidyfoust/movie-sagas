import React, { Component } from 'react';
import './App.css';
import MovieList from '../MovieList/MovieList.js'
import { HashRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
      <div className="App">
        <div className="App-header">
        <h1>Movies 2 Go</h1>
        </div>
      </div>
        <Route exact path='/' component={MovieList} />
        {/* <Route exact path='/details/:id' component={PlantDetails} /> */}
        {/* render={({match}) =><MovieDetails match={match}/> another way of using match*/} 
      </Router>
    );
  }
}

export default App;
