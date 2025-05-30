import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import  storage  from 'redux-persist/lib/storage';
// import { thunk } from 'redux-thunk'; Migrating to saga therfore no need to import thunk
// import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';

/* This part is still not clear how we are crating custom logger this is something using 
curring from js simply remember this boiler code for custom logger otherwise use logger from redux
but the issue with that is it combine differnt logs together and gives us in the format
currentState
action
nextState
which sometime make difficult to understand when excatly what code is running*/

const sagaMiddleware=createSagaMiddleware();

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

const persistConfig={
  key:'root',
  storage,
  whitelist: ['cart']
}
/*since we have a spinner while the application loads so we no need any more to persist the 
other reducer values therefore instead of doing blacklist:[user], which refers don't persist user
and persist all other reducer values we will be doing whitelist:[cart], which implies persist
only cartr */
  
const persistedReducer=persistReducer(persistConfig, rootReducer);
// const middleWares = [process.env.NODE_ENV !== 'production' && loggerMiddleware, thunk].filter(Boolean);
const middleWares = [process.env.NODE_ENV !== 'production' && loggerMiddleware, sagaMiddleware].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

/* if you don't want to use react dev tool you can simply go with this 
const composedEnhancers = compose(applyMiddleware(...middleWares));*/

export const store = createStore(persistedReducer, undefined, composedEnhancers);
/*If you don't want persist in redux go with this simple line
export const store = createStore(rootreducer, undefined, composedEnhancers);
 */

//ater the store is initiated then we tell saga middleware to run
sagaMiddleware.run(rootSaga);

export const persistor=persistStore(store);

/* simple way
export const store = createStore(rootReducer, applyMiddleware(logger));
*/