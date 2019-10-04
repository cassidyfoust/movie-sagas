import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchMovies);
    yield takeEvery('SELECT_MOVIE', selectMovie)
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// axios call to server to get movies
function* fetchMovies(){
    try {
        const response = yield axios.get('/movies/');
        console.log('response:', response)
        yield put({ type: 'SET_MOVIES', payload: response.data })
    } catch (error) {
        console.log('error while fetching movies:', error)
    }
}

// generator function to set selected movie
function* selectMovie(action){
    try{
        const response = yield axios.get(`/movies/detail/${action.payload}`);
        yield put({type: 'IS_SELECTED_MOVIE', payload: response.data})
    } catch (error) {
        console.log('error while setting selected movie:', error)
    }
}

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

const selectedMovie = (state = [], action) => {
    switch (action.type) {
        case 'IS_SELECTED_MOVIE':
            console.log('this is the payload:', action.payload)
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        selectedMovie
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
