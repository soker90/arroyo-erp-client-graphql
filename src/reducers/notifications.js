import createReducer from 'redux/create-reducer';
import {setPayload} from 'redux/setPayload';

export const NEW_NOTIFICATION = 'notifications/NEW_NOTIFICATION';

export const addNotification = notification => dispatch => {
  dispatch({type: NEW_NOTIFICATION, payload: {notification}});
};

const INITIAL_STATE = {
  notification: {},
};

const ACTION_HANDLERS = {
  [NEW_NOTIFICATION]: setPayload,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
