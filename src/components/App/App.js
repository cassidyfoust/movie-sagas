import React, { Component } from 'react';
import './App.css';
import MovieList from '../MovieList/MovieList.js'
import MovieDetails from '../MovieDetails/MovieDetails.js'
import EditMovie from '../EditMovie/EditMovie.js'
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
  reduxState,
});

class App extends Component {

  state = {
    searchQuery: ''
  }

  handleChange = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
  }

  goHome = () => {
    this.props.dispatch({ type: 'FETCH_MOVIES' });
  }

  handleClick = () => {
    this.props.dispatch({ type: 'SEARCH_MOVIES', payload: this.state.searchQuery })
  }

  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
      <div className="App">
        <div className="App-header">
            <div className="searchbar"> <TextField
              id="standard-with-placeholder"
              placeholder="Search by title"
              onChange={(event) => this.handleChange(event)}
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
            <button className="searchBtn" onClick={(event) => this.handleClick()}>Search</button>
            <div className="homeBtn" onClick={this.goHome}>
              <Link to="/" className="link">Home</Link>
            </div>
          <h1>Movies 2 Go</h1>
        </div>
      </div>
        <Route exact path='/' component={MovieList}/>
        <Route path='/details/:id' component={MovieDetails}/>
        <Route path='/edit/:id' component={EditMovie}/>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);
