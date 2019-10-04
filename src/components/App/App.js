import React, { Component } from 'react';
import './App.css';
import MovieList from '../MovieList/MovieList.js'
import MovieDetails from '../MovieDetails/MovieDetails.js'
import { HashRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
      <div className="App">
        <div className="App-header">
            <div className="homeBtn">
              <Link to="/" className="link">Home</Link>
            </div>
          <h1>Movies 2 Go</h1>
        </div>
      </div>
        <Route exact path='/' component={MovieList} />
        <Route path='/details' component={MovieDetails}/>
        {/* {({match}) =><MovieDetails match={match}/>} */}
      </Router>
    );
  }
}

export default App;
