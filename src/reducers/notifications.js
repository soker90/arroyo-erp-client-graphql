import createReducer from 'redux/create-reducer';

export const NEW_NOTIFICATION = 'notifications/NEW_NOTIFICATION';

export const addNotification = notification => dispatch => {
  dispatch({type: NEW_NOTIFICATION, notification});
};

const INITIAL_STATE = {
  notification: {},
};

const ACTION_HANDLERS = {
  [NEW_NOTIFICATION]: (state, {notification}) => ({notification}),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
