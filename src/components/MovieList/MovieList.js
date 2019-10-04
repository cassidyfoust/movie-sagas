import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState,
});

class MovieList extends Component {
    componentDidMount() {
        // use component did mount to dispatch an action to request the plantList from the API
        this.getMovies();
    }

    getMovies() {
        this.props.dispatch({ type: 'FETCH_MOVIES' });
    }
    render() {
        return (
    <div className="movie-list">
        {this.props.reduxState.movies.map((movie) => {
            return (
                <div className="movie-item">
                    <div>
                    <h5>{movie.title}</h5>
                    </div>
                    <div>
                    <img src={movie.poster}></img>
                    </div>
                    {/* <div className="description">
                    {movie.description}
                        </div> */}
                </div>
                )
        })}
    </div>
        );
    }
}

export default connect(mapStateToProps)(MovieList);