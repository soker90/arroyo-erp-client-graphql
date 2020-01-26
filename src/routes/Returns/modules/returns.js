import createReducer from 'redux/create-reducer';
import Immutable from 'immutable';
import axios from 'axios';

import {RETURNS_GET_DATA} from 'action-types';

export const getRetorned = () => async dispatch => {
  dispatch({type: RETURNS_GET_DATA.REQUEST});
  try {
    const response = await axios({url: '/recovery/getRetorned'});
    dispatch({type: RETURNS_GET_DATA.SUCCESS});
    dispatch({type: RETURNS_GET_DATA.SET, payload: response.data});
  } catch (error) {
    console.log(error);
    dispatch({type: RETURNS_GET_DATA.FAILURE, error});
  }
};

export const actions = {
  getRetorned,
};

const INITIAL_STATE = Immutable.fromJS({
  returned: [],
});

const ACTION_HANDLERS = {
  [RETURNS_GET_DATA.REQUEST]: (state, {payload}) =>
    state.set('returned', Immutable.fromJS([])),
  [RETURNS_GET_DATA.SET]: (state, {payload}) =>
    state.set('returned', Immutable.fromJS(payload)),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
