import axios from 'axios';
import browserHistory from 'redux/history';
import {decodeToken, setAuthorizationToken} from 'utils/axios-authorization';
import {ARROYO_TOKEN, DEFAULT_REDIRECT, LOGIN} from 'constants/auth';

export const setCurrentUser = token => (_loginSet(token));

const _loginRequest = () => ({type: LOGIN.REQUEST});

const _loginSuccess = () => ({type: LOGIN.SUCCESS});

const _loginSet = payload => ({type: LOGIN.SET, payload});

const _loginError = error => ({
  type: LOGIN.FAILURE,
  error,
});

export const login = ({username, password}) => async dispatch => {
  dispatch(_loginRequest());

  try {
    const {data} = await axios.post('',
      {
        query: `
      mutation { 
        auth(user: "${username}", password: "${password}") {
          token
        }
      }`,
      },
    );

    if (data.errors) {
      dispatch(_loginError(data.errors[0]));
      return;
    }

    const token = data?.data?.auth?.token;
    localStorage.setItem(ARROYO_TOKEN, token);
    setAuthorizationToken(token, dispatch);

    dispatch(_loginSet(decodeToken(token)));
    dispatch(_loginSuccess());
    browserHistory.push(DEFAULT_REDIRECT);
  } catch (error) {
    dispatch(_loginError(error));
  }
};
