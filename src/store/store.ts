import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import  storage  from 'redux-persist/lib/storage';
// import { thunk } from 'redux-thunk'; Migrating to saga therfore no need to import thunk
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';

export type RootState=ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

/* This part is still not clear how we are crating custom logger this is something using 
curring from js simply remember this boiler code for custom logger otherwise use logger from redux
but the issue with that is it combine differnt logs together and gives us in the format
currentState
action
nextState
which sometime make difficult to understand when excatly what code is running*/

const sagaMiddleware=createSagaMiddleware();

// const loggerMiddleware:Middleware<{}, RootState> = (store) => (next) => (action) => {
//     if (!action.type) {
//       return next(action);
//     }
  
//     console.log('type: ', action.type);
//     console.log('payload: ', action.payload);
//     console.log('currentState: ', store.getState());
  
//     next(action);
  
//     console.log('next state: ', store.getState());
//   };

type ExtendedConfig= PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}
//persist config can work without this ExtendedConfig 
// type also but by doing this we narrow down the whilist 
// array items to the keys of rootReducer otherwise it's type is string[] it can hold any value
const persistConfig:ExtendedConfig={
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
const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter((middleware): middleware is Middleware => Boolean(middleware));
//TypeScript can’t narrow the type of the result — so it still thinks the filtered array might include false, not just Middleware. therfore we are explictly typescript if it passes and its true value then its a middleware

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