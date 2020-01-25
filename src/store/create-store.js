import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';

import createRootReducer from '../reducers';
import appMiddlewares from './middlewares';
import {setCurrentUser} from 'actions/auth';
import {NERA_TOKEN} from 'constants/auth';
import configureAxios from '../config/axios';

import {setAuthorizationToken, decodeToken} from '../utils/axios-authorization';

export const history = createBrowserHistory();

export default function configureStore(initialState = {}) {
  const middlewares = [...appMiddlewares];

  const composeEnhancers = composeWithDevTools({});

  const store = createStore(
    createRootReducer(history), // root reducer with router state
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), ...middlewares))
  );

  const {dispatch} = store;

  const token = localStorage.getItem(NERA_TOKEN);

  if (token) {
    setAuthorizationToken(token, dispatch);
    dispatch(setCurrentUser(decodeToken(token)));
    configureAxios(dispatch);
  }

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
