import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState,
});

class MovieDetails extends Component {


    componentDidMount() {
        this.getMovieById();
    }
    
    componentDidUpdate() {
        this.getMovieById();
    }

    getMovieById = () => {
        this.props.dispatch({ type: 'SELECT_MOVIE', payload: this.props.match.params.id });
    }

handleClick = () => {
    console.log('clicked')
    this.props.history.push(`/edit/${this.props.match.params.id}`)
}

    render() {

        return (
            <>
            <div className="movie-details">
                {this.props.reduxState.selectedMovie.map((movie) => {
                    return (
                        <>
                        <div className="flexwrap"><img src={movie.poster} height="250px"></img>
                            <div className="info">
                                <b>{movie.title}</b>
                                <br></br>
                            <div>{movie.description}</div>
                            </div>
                            <div className="genres-and-edit">
                            <div className="genres">
                                        <b>Genres:</b>
                                    {this.props.reduxState.selectedMovieGenre.map((genre) => {
                                        return (
                                            <><br></br>
                                                ⁠— {genre.name}
                                                <br></br>
                                            </>
                                        )
                                    })}
                                    </div>
                                    <div>
                                    <button className="editBtn" onClick={(event) => this.handleClick()}>Edit</button>
                                </div>
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