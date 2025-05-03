import { compose, createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

/* This part is still not clear how we are crating custom logger this is something using 
curring from js simply remember this boiler code for custom logger otherwise use logger from redux
but the issue with that is it combine differnt logs together and gives us in the format
currentState
action
nextState
which sometime make difficult to understand when excatly what code is running*/

const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
      return next(action);
    }
  
    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());
  
    next(action);
  
    console.log('next state: ', store.getState());
  };
  

const middleWares = [loggerMiddleware]

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);

/* simple way
export const store = createStore(rootReducer, applyMiddleware(logger));
*/