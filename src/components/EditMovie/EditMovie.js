import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

const mapStateToProps = reduxState => ({
    reduxState,
});

class EditMovie extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'SELECT_MOVIE', payload: this.props.match.params.id});
    }

// local state stores updated movie information
state = {
    movieToUpdate: {
        id: this.props.match.params.id,
        title: '',
        description: ''
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
                    <div className="edit">
                        <h3>Update Movie:</h3>
                        {this.props.reduxState.selectedMovie.map((movie) => {
                            return (
                                <>
                            <form onSubmit={this.updateMovie}>
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
                                        <button type="submit" className="generalBtn">
                                        Update
                                    </button>
                                        <button className="generalBtn" onClick={this.goBack}>Cancel</button>
                            </form>
                            </>
                            )})}
                        </div>
                </div>
            </>
            )
    }
}

export default connect(mapStateToProps)(EditMovie);