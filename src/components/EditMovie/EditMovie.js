import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

const mapStateToProps = reduxState => ({
    reduxState,
});

class EditMovie extends Component {

// local state stores updated movie information
state = {
    movieToUpdate: {
        id: this.props.reduxState.selectedMovieId,
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

    updateMovie = event => {
        event.preventDefault();
        console.log('updated movie!');
        this.props.dispatch({type: 'UPDATE_MOVIE', payload: this.state.movieToUpdate})
        this.props.dispatch({ type: 'SELECT_MOVIE', payload: this.state.movieToUpdate.id})
        this.props.history.push('/details')
    }

    render() {

        return (
            <>
                <div>
                    <div className="edit">
                        <h3>Update</h3>
                    <br></br>
                    <form onSubmit={this.updateMovie}>
                        <div>
                            <TextField
                                id="outlined-name"
                                label="Title"
                                value={this.state.movieToUpdate.title}
                                onChange={(event) => this.handleChange('title', event)}
                                margin="normal"
                                variant="outlined"
                            /></div>
                        <div>
                            <TextField
                                id="outlined-name"
                                label="Description"
                                value={this.state.movieToUpdate.description}
                                onChange={(event) => this.handleChange('description', event)}
                                margin="normal"
                                variant="outlined"
                            /></div>
                        <div>
                            <br></br>
                            <Button variant="outlined" color="default" size="small" type="submit" >
                                Update Movie
                        <AddIcon />
                            </Button>
                        </div>
                    </form>
                </div>
                </div>
            </>
            )
    }
}

export default connect(mapStateToProps)(EditMovie);