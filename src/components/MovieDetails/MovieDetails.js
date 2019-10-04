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
            <p>Test</p>
            {JSON.stringify(this.props.reduxState.selectedMovie)}
                </div>
            </>
        )
    }
}

export default connect(mapStateToProps)(MovieDetails);