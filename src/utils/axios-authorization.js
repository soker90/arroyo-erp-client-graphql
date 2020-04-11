import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {logout} from 'actions/auth';

let authInterceptor;

export const setAuthorizationToken = (token, dispatch) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`;
    authInterceptor = axios.interceptors.response.use(
      response => response,
      error => {
        const jwtExpired =
                error.response.status === 400 &&
                /Acceso denegado/.test(error.response.data?.errors?.[0]?.message);
        if (
          (error.response && [401].includes(error.response.status)) ||
          jwtExpired
        ) {
          return dispatch(logout());
        }
        return Promise.reject(error);
      },
    );
  } else {
    delete axios.defaults.headers.common['Authorization'];
    axios.interceptors.response.eject(authInterceptor);
  }
};

export const decodeToken = token => {
  let decoded = {};
  try {
    decoded = jwtDecode(token);
  } catch (err) {
    console.error(err);
  }
  return decoded;
};
