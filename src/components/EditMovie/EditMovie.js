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
        genreId:'',
        genreDeleteId: '',
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

    handleGenreAdd = event => {
        if (event.target.value === 'Adventure'){
        this.setState({
            movieToUpdate: {
                ...this.state.movieToUpdate,
                genreId: 1,
            }
        })
    }
        else if (event.target.value === 'Animated'){
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreId: 2,
                }
            })
        }
        else if (event.target.value === 'Biographical') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreId: 3,
                }
            })
        }
        else if (event.target.value === 'Comedy') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreId: 4,
                }
            })
        }
        else if (event.target.value === 'Disaster') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreId: 5,
                }
            })
        }
        else if (event.target.value === 'Drama') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreId: 6,
                }
            })
        }
        else if (event.target.value === 'Epic') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreId: 7,
                }
            })
        }
        else if (event.target.value === 'Fantasy') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreId: 8,
                }
            })
        }
        else if (event.target.value === 'Musical') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreId: 9,
                }
            })
        }
        else if (event.target.value === 'Romantic') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreId: 10,
                }
            })
        }
        else if (event.target.value === 'Science Fiction') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreId: 11,
                }
            })
        }
        else if (event.target.value === 'Space-Opera') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreId: 12,
                }
            })
        }
        else if (event.target.value === 'Superhero') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreId: 13,
                }
            })
        }   
    };

    // update onClick event
    updateMovie = event => {
        event.preventDefault();
        console.log('updated movie!');
        this.props.dispatch({type: 'UPDATE_MOVIE', payload: this.state.movieToUpdate})
        this.props.dispatch({ type: 'SELECT_MOVIE', payload: this.state.movieToUpdate.id})
        this.props.history.push(`/details/${this.state.movieToUpdate.id}`)
    }

    handleGenreDelete = event => {
        if (event.target.value === 'Adventure') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreDeleteId: 1,
                }
            })
        }
        else if (event.target.value === 'Animated') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreDeleteId: 2,
                }
            })
        }
        else if (event.target.value === 'Biographical') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreDeleteId: 3,
                }
            })
        }
        else if (event.target.value === 'Comedy') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreDeleteId: 4,
                }
            })
        }
        else if (event.target.value === 'Disaster') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreDeleteId: 5,
                }
            })
        }
        else if (event.target.value === 'Drama') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreDeleteId: 6,
                }
            })
        }
        else if (event.target.value === 'Epic') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreDeleteId: 7,
                }
            })
        }
        else if (event.target.value === 'Fantasy') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreDeleteId: 8,
                }
            })
        }
        else if (event.target.value === 'Musical') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreDeleteId: 9,
                }
            })
        }
        else if (event.target.value === 'Romantic') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreDeleteId: 10,
                }
            })
        }
        else if (event.target.value === 'Science Fiction') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreDeleteId: 11,
                }
            })
        }
        else if (event.target.value === 'Space-Opera') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreDeleteId: 12,
                }
            })
        }
        else if (event.target.value === 'Superhero') {
            this.setState({
                movieToUpdate: {
                    ...this.state.movieToUpdate,
                    genreDeleteId: 13,
                }
            })
        }
    };

    addGenre = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'UPDATE_GENRE', payload: this.state.movieToUpdate })
    }

    deleteGenre = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'DELETE_GENRE', payload: this.state.movieToUpdate })
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
                                                    <select className="select-css" onChange={this.handleGenreAdd}>
                                                        <option>
                                                            None
                                                        </option>
                                                        {this.props.reduxState.allGenres.map(genre => (
                                                            <option key={genre.id}>
                                                                {genre.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button className="addGenreBtn" onClick={this.addGenre}>Add Genre</button>
                                                </div>
                                                <b>Delete Genre:</b>
                                                    <div><br></br></div>
                                                    <div className="select-wrapper">
                                                        <select className="select-css" onChange={this.handleGenreDelete}>
                                                            <option>
                                                                None
                                                        </option>
                                                        {this.props.reduxState.selectedMovieGenre.map(genre => (
                                                                <option key={genre.id}>
                                                                    {genre.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <button className="deleteGenreBtn" onClick={this.deleteGenre}>Delete Genre</button>
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