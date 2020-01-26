import {ARROYO_TOKEN, LOGIN_ROUTE} from 'constants/auth';
import {setAuthorizationToken} from 'utils/axios-authorization';
import {setCurrentUser} from './login';
import browserHistory from 'redux/history';

export const logout = () => dispatch => {
  localStorage.removeItem(ARROYO_TOKEN);
  setAuthorizationToken(false);
  dispatch(setCurrentUser(null));
  browserHistory.push(LOGIN_ROUTE);
};
