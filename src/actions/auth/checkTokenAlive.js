import {ARROYO_TOKEN, DEFAULT_REDIRECT, LOGIN_ROUTE} from 'constants/auth';
import {decodeToken, setAuthorizationToken} from 'utils/axios-authorization';
import browserHistory from 'redux/history';
import {setCurrentUser} from './login';

const isLoginView = () =>
  window.location.pathname.includes(LOGIN_ROUTE) ||
  window.location.pathname === '/';

export const checkTokenAlive = () => dispatch => {
  const token = localStorage.getItem(ARROYO_TOKEN);
  if (token) {
    const tokenDecode = decodeToken(token);
    const currentTime = new Date().getTime() / 1000;

    if (currentTime < tokenDecode.exp) {
      setAuthorizationToken(token, dispatch);

      dispatch(setCurrentUser(decodeToken));
      if (isLoginView())
        browserHistory.push(DEFAULT_REDIRECT)
    }

    return;
  }
  if (!window.location.pathname.includes(LOGIN_ROUTE))
    browserHistory.push(LOGIN_ROUTE);

};
