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

export const login = ({username, password}) => dispatch => {
  dispatch(_loginRequest());

  return axios.post('',
    {
      query: `
      mutation { 
        auth(user: "${username}", password: "${password}") {
          token
        }
      }`,
    },
  ).then(({data}) => {
    if (data.errors) {
      dispatch(_loginError(data.errors[0]))
    } else {
      const token = data?.data?.auth?.token;
      localStorage.setItem(ARROYO_TOKEN, token);
      setAuthorizationToken(token, dispatch);

      //dispatch(getDropdownValues());

      dispatch(_loginSet(decodeToken(token)));
      dispatch(_loginSuccess());
      browserHistory.push(DEFAULT_REDIRECT);
    }
  })
    .catch(({errors}) => {
      dispatch(_loginError(errors?.[0]));
    });
};
