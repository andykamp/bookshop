"use strict"
//REACT
import  React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
//REACT-ROUTER
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger'; //logs all beautifully in dev mode
import thunk from 'redux-thunk';

//IMPORT COMBINED REDUCERS
import reducers from './reducers/index';
//IMPORT ACTIONS
//does not need a index.js in actions beacouse we do not neet to comine actions as we do reducers
//but we can if we want to have al in one line like the reducers above
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

//STEP 1 create the store
const middleware =applyMiddleware(thunk, logger);
//WE WILL PASS INITIAL STATE FROM SERVER store
const initialState= window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);


import routes from './routes';
const Routes =(
  <Provider store={store}>
    {routes}
  </Provider>
)
render (
  Routes, document.getElementById('app')
);
