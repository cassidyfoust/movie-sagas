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
                        <><div className="flexwrap"><img src={movie.poster} height="250px"></img>
                            <div className="info">
                                <b>{movie.title}</b>
                                <br></br>
                            <div>{movie.description}</div>
                            </div>
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