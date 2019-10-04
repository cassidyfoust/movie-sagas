import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState,
});

class MovieDetails extends Component {

    render() {
        return (
            <>
            <div className="movie-details">
                {this.props.reduxState.selectedMovie.map((movie, id) => {
                    return (
                        <>
                            <div>
                               <h5>Title:</h5>{movie.title}
                            </div>
                        </>
                    )
                })}
                </div>
            </>
        )
    }
}

export default connect(mapStateToProps)(MovieDetails);