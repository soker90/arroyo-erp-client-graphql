import Immutable from 'immutable';
import createReducer from 'redux/create-reducer';
import axios from 'axios';

import {
  GET_USER,
  GET_USER_ROLES,
  SET_USER,
  CREATE_USER,
  EDIT_USER,
  RESET_PASSWORD,
} from 'action-types';
import {addNotification} from './notifications';

const getUsers = () => async dispatch => {
  dispatch({type: GET_USER.REQUEST});

  try {
    const response = await axios('/user');

    dispatch({type: GET_USER.SUCCESS});
    dispatch({type: GET_USER.SET, payload: response.data});
  } catch (error) {
    console.error(error);
    dispatch({type: GET_USER.FAILURE, error});
  }
};

const getRoles = () => async dispatch => {
  dispatch({type: GET_USER_ROLES.REQUEST});

  try {
    const response = await axios('user/roles');

    dispatch({type: GET_USER_ROLES.SUCCESS});
    dispatch({type: GET_USER_ROLES.SET, payload: response.data});
  } catch (error) {
    console.error(error);
    dispatch({type: GET_USER_ROLES.FAILURE, error});
  }
};

const setUser = () => async dispatch => {
  dispatch({type: SET_USER.REQUEST});
};

const createUser = user => async dispatch => {
  delete user.roleIds;
  dispatch({type: CREATE_USER.REQUEST});

  try {
    const response = await axios.post('/user', user);

    dispatch({type: CREATE_USER.SUCCESS});
    dispatch({type: CREATE_USER.SET, payload: response.data});
    dispatch(
      addNotification({
        level: 'success',
        title: 'CREADO USUARIO',
        message: `Se ha dado de alta al usuario ${
          user.login
        }. Por favor revisa el correo para obtener la contraseña de acceso`,
      })
    );
  } catch (error) {
    console.error(error);
    dispatch({type: CREATE_USER.FAILURE, error});
  }
};

const editUser = user => async dispatch => {
  dispatch({type: EDIT_USER.REQUEST});

  try {
    const editedUser = {...user};

    delete editedUser.roleIds;
    delete editedUser.editRole;
    delete editedUser.editField;
    await axios.put('/user', editedUser);

    dispatch({
      type: EDIT_USER.SUCCESS,
      payload: {
        level: 'success',
        title: 'USUARIO ACTUALIZADO',
        message: `Se ha modificado el usuario ${user.login}.`,
      },
    });
    dispatch(getUsers());
  } catch (error) {
    console.error(error);
    dispatch({type: EDIT_USER.FAILURE, error});
  }
};

const resetPassword = login => async dispatch => {
  dispatch({type: RESET_PASSWORD.REQUEST});

  try {
    const URL = `/user/${login}/resetPassword`;
    await axios.put(URL);

    dispatch({
      type: RESET_PASSWORD.SUCCESS,
      payload: {
        level: 'success',
        title: 'CONTRASEÑA ENVIADA',
        message:
          'Se han enviado la contraseña al usuario por correo electrónico',
      },
    });
  } catch (error) {
    console.error(error);
    dispatch({type: RESET_PASSWORD.FAILURE, error});
  }
};

export const actions = {
  createUser,
  getUsers,
  getRoles,
  setUser,
  editUser,
  resetPassword,
};

// ------------------------------------
// Initial state
// ------------------------------------

const INITIAL_STATE = Immutable.Map({
  users: [],
  roles: [],
});

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [GET_USER.SET]: (state, {payload}) => state.set('users', payload),
  [GET_USER_ROLES.SET]: (state, {payload}) => state.set('roles', payload),
};

// ------------------------------------
// Reducer
// ------------------------------------

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
