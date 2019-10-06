import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const mapStateToProps = reduxState => ({
    reduxState,
});

class EditMovie extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'SELECT_MOVIE', payload: this.props.match.params.id});
        this.props.dispatch({type: 'GET_GENRES'})
    }

// local state stores updated movie information
state = {
    movieToUpdate: {
        id: this.props.match.params.id,
        title: '',
        description: '',
        genre:''
    }
}

// adds updated movie information to state on change of input fields
    handleChange = (propertyName, event) => {
        console.log('event happened')
        this.setState({
            movieToUpdate: {
                ...this.state.movieToUpdate,
                [propertyName]: event.target.value,
            }
        });
    }

    // adds updated movie genre to state

    handleGenreChange = event => {
        if (event.target.value !== 'none'){
        this.setState({
            movieToUpdate: {
                ...this.state.movieToUpdate,
                genre: event.target.value,
            }
        });;}
    };

    // update onClick event
    updateMovie = event => {
        event.preventDefault();
        console.log('updated movie!');
        this.props.dispatch({type: 'UPDATE_MOVIE', payload: this.state.movieToUpdate})
        this.props.dispatch({ type: 'SELECT_MOVIE', payload: this.state.movieToUpdate.id})
        this.props.history.push(`/details/${this.state.movieToUpdate.id}`)
    }

    // cancel button functionality
    goBack = () => {
        this.props.dispatch({ type: 'SELECT_MOVIE', payload: this.state.movieToUpdate.id })
        this.props.history.push(`/details/${this.state.movieToUpdate.id}`)
    }

    render() {
        return (
            <>
                <div>
                    <div className="editHeader">
                        <h3>Update Movie:</h3></div>
                        {this.props.reduxState.selectedMovie.map((movie) => {
                            return (
                                <>
                               <form onSubmit={this.updateMovie}>
                                    <div className="edit">
                                        <div className="mainForm">
                                            <b>Title:</b>
                                            <div>
                                                <TextField
                                                    id="standard-with-placeholder"
                                                    placeholder={movie.title}
                                                    onChange={(event) => this.handleChange('title', event)}
                                                    margin="normal"
                                                    variant="outlined"
                                                            inputProps={{
                                                                style: {
                                                                    width: '500px',
                                                                    // padding: '0 14px',
                                                                },
                                                            }}
                                                /></div>
                                            <b>Description</b>
                                            <div>
                                                <TextField
                                                    id="standard-textarea"
                                                    placeholder={movie.description}
                                                    onChange={(event) => this.handleChange('description', event)}
                                                    margin="normal"
                                                    variant="outlined"
                                                    multiline
                                                            inputProps={{
                                                                style: {
                                                                    height: '350px',
                                                                    width: '500px',
                                                                    // padding: '0 14px',
                                                                }, }}
                                                    /></div>
                                                </div>
                                            <div className="genreUpdate"><b>Add Genre:</b>
                                                <div><br></br></div>
                                                <div className="select-wrapper">
                                                    <select className="select-css" onChange={this.handleGenreChange}>
                                                        <option>
                                                            None
                                                        </option>
                                                        {this.props.reduxState.allGenres.map(genre => (
                                                            <option key={genre.id}>
                                                                {genre.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                        
                                        </div>
                                        </div>
                                        <div className="editFooter">
                                        <button type="submit" className="generalBtn">
                                        Update
                                    </button>
                                    <button className="generalBtn" onClick={this.goBack}>Cancel</button>
                                    </div>
                            </form>
                            </>
                            )})}
                </div>
            </>
            )
    }
}

export default connect(mapStateToProps)(EditMovie);