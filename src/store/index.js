import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { hotelsReducer } from '../store/modules/hotels/reducer';
import rootSaga from '../store/sagas';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory()
});

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  router: routerReducer,
  hotels: hotelsReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) => getDefault({ thunk: false }).concat(routerMiddleware, sagaMiddleware),
  devTools: true
});

export const history = createReduxHistory(store);

sagaMiddleware.run(rootSaga);


