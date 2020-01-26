import axios from 'axios';
import createReducer from 'redux/create-reducer';
import browserHistory from 'redux/history';

import {
  SET_USER_PERMISSIONS,
  GET_PERMISSION_LIST,
  GET_ROLE_PERMISSION,
  UPDATE_ROLE_PERMISSION,
} from 'action-types';
import {userRoles} from 'utils/user-permissions';
import {setPayload} from '../redux/setPayload';

const BASE_PATH = process.env.NERA_ROUTER_BASE_PATH;

export const getUserPermission = () => async dispatch => {
  dispatch({type: SET_USER_PERMISSIONS.REQUEST});

  try {
    const response = await axios('/security/permissions');

    dispatch({
      type: SET_USER_PERMISSIONS.SUCCESS,
      payload: {
        level: 'info',
        title: '¡Bienvenid@!',
        message: 'Tienes acceso restringido a algunas áreas.',
        action: {
          label: 'Ver permisos',
          callback: () => {
            browserHistory.push(`${BASE_PATH}/settings/permissions`);
          },
        },
        dismissible: true,
        autoDismiss: 10,
      },
    });
    dispatch({type: SET_USER_PERMISSIONS.SET, payload: {userPermissions: response.data}});
  } catch (error) {
    console.error(error);
    dispatch({type: SET_USER_PERMISSIONS.FAILURE, error});
  }
};

export const getPermissionList = () => async dispatch => {
  dispatch({type: GET_PERMISSION_LIST.REQUEST});

  try {
    const response = await axios('/security/components');
    const items = response.data.map(item => ({[item]: item}));
    const payload = {permissionList: response.data, permissions: items};

    dispatch({type: GET_PERMISSION_LIST.SUCCESS});
    dispatch({type: GET_PERMISSION_LIST.SET, payload});
  } catch (error) {
    console.error(error);
    dispatch({type: GET_PERMISSION_LIST.FAILURE, error});
  }
};

export const getRolePermissions = role => async dispatch => {
  dispatch({type: GET_ROLE_PERMISSION.REQUEST});

  try {
    const URL = `/security/permissions/${role}`;
    const response = await axios(URL);

    dispatch({type: GET_ROLE_PERMISSION.SUCCESS});
    dispatch({type: GET_ROLE_PERMISSION.SET, payload: {rolePermissions: response.data}});
  } catch (error) {
    console.error(error);
    dispatch({type: GET_ROLE_PERMISSION.FAILURE, error});
  }
};

const updatePermissions = (permissions, role) => async dispatch => {
  dispatch({type: UPDATE_ROLE_PERMISSION.REQUEST});

  try {
    const URL = `/security/permissions/${role}`;
    const response = await axios.put(URL, permissions);

    dispatch({type: UPDATE_ROLE_PERMISSION.SUCCESS});
    dispatch({type: UPDATE_ROLE_PERMISSION.SET, payload: {rolePermissions: response.data}});
  } catch (error) {
    console.error(error);
    dispatch({type: UPDATE_ROLE_PERMISSION.FAILURE, error});
  }
};

export const actions = {
  getUserPermission,
  getPermissionList,
  getRolePermissions,
  updatePermissions,
};

const INITIAL_STATE = {
  userPermissions: [],
  roles: userRoles,
  permissionList: [],
  permissions: {},
  rolePermissions: [],
};

const ACTION_HANLDERS = {
  [SET_USER_PERMISSIONS.REQUEST]: () => INITIAL_STATE,
  [SET_USER_PERMISSIONS.SET]: setPayload,
  [GET_PERMISSION_LIST.SET]: setPayload,
  [GET_ROLE_PERMISSION.SET]: setPayload,
  [UPDATE_ROLE_PERMISSION.SET]: setPayload,
};

export default createReducer(INITIAL_STATE, ACTION_HANLDERS);
