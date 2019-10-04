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
    <div>
        {JSON.stringify(this.props.reduxState.movies)}
        {/* {this.props.reduxState.movies.map((movie) => {
            return (
                <div>
                 {movie.name}
                </div>
                )
        })} */}
    </div>
        );
    }
}

export default connect(mapStateToProps)(MovieList);