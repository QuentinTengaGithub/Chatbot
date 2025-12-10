import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import combineReducers from './Reducers';

export default function configureStore(initialState) {
  const store = createStore(
    combineReducers,
    initialState,
    compose(applyMiddleware(reduxThunk), window.devToolsExtension ? window.devToolsExtension({ trace: true }) : f => f)
  );
  return store;
}