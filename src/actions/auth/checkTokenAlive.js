import {LOGIN_ROUTE, ARROYO_TOKEN, DEFAULT_REDIRECT} from 'constants/auth';
import {decodeToken, setAuthorizationToken} from 'utils/axios-authorization';
import {getPermissionList, getUserPermission} from 'reducers/permissions';
import {getDropdownValues} from 'actions/common/getDropdownValues';
import browserHistory from 'redux/history';
import {setCurrentUser} from './login';

const isLoginView = () =>
  window.location.pathname.includes(LOGIN_ROUTE) ||
  window.location.pathname === '/';

export const checkTokenAlive = () => dispatch => {
  const token = localStorage.getItem(ARROYO_TOKEN);
  if (token) {
    setAuthorizationToken(token, dispatch);
    dispatch(getPermissionList());
    dispatch(getUserPermission());
    dispatch(getDropdownValues());
    dispatch(setCurrentUser(decodeToken(token)));
    if (isLoginView())
      browserHistory.push(DEFAULT_REDIRECT)
  } else {
    if (!window.location.pathname.includes(LOGIN_ROUTE))
      browserHistory.push(LOGIN_ROUTE);
  }
};
