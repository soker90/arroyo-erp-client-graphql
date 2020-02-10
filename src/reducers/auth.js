import {LOGIN, URL_FOR_AUTHENTICATE} from 'constants/auth';
import createReducer from 'redux/create-reducer';

const LOGIN_ERRORS = {
  DEFAULT: 'Error desconocido',
  UNAUTHORIZED: 'Credenciales inválidas',
  INTERNAL_SERVER_ERROR: 'Error interno del servidor',
};

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
  loginError: null,
};

const ACTION_HANDLERS = {
  [LOGIN.REQUEST]: () => INITIAL_STATE,
  [LOGIN.SET]: (state, {payload}) => {
    // TODO Quitar condicional del reducer
    if (payload?.user) {
      return {...state, ...payload, isAuthenticated: true}
    }

    return INITIAL_STATE;
  },
  [LOGIN.FAILURE]: (state, {error}) => {
    //TODO Llevar esto al action
    let message = LOGIN_ERRORS.DEFAULT;

    if (error?.message)
      message = error.message;
    else {

      //TODO Quitar lodash para esto
      switch (error?.statusCode) {
        case 401:
          message = LOGIN_ERRORS.UNAUTHORIZED;
          break;
        case 500:
          message = LOGIN_ERRORS.INTERNAL_SERVER_ERROR;
          break;
        default:
      }
    }

    return {...state, loginError: {message}};
  },
  [URL_FOR_AUTHENTICATE.SET]: (state, {url}) => ({...state, url}),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
