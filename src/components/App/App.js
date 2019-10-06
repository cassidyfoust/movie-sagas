import React, { Component } from 'react';
import './App.css';
import MovieList from '../MovieList/MovieList.js'
import MovieDetails from '../MovieDetails/MovieDetails.js'
import EditMovie from '../EditMovie/EditMovie.js'
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
      <div className="App">
        <div className="App-header">
            <div className="searchbar"> <TextField
              id="standard-with-placeholder"
              placeholder="Search by title"
              // onChange={(event) => this.handleChange('title', event)}
              margin="normal"
              inputProps={{
                style: {
                  width: '200px',
                  height: '30px',
                  padding: 7,
                  background: '#E5E4B2',
                },
              }}
            />
            </div>
            <button className="searchBtn">Search</button>
            <div className="homeBtn">
              <Link to="/" className="link">Home</Link>
            </div>
          <h1>Movies 2 Go</h1>
        </div>
      </div>
        <Route exact path='/' component={MovieList} />
        <Route path='/details/:id' component={MovieDetails}/>
        <Route path='/edit/:id' component={EditMovie}/>
      </Router>
    );
  }
}

export default App;
