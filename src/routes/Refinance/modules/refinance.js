import createReducer from 'redux/create-reducer';
import Immutable from 'immutable';
import {GET_RECOVERIES} from 'action-types';
import axios from 'axios';

export const getRefinanceContract = () => async dispatch => {
  dispatch({type: GET_RECOVERIES.REQUEST});

  try {
    const response = await axios({url: 'recovery/getRefinanceContract'});

    dispatch({type: GET_RECOVERIES.SUCCESS});
    dispatch({type: GET_RECOVERIES.SET, payload: response.data});
  } catch (error) {
    console.log(error);
    dispatch({type: GET_RECOVERIES.FAILURE, error});
  }
};

export const actions = {
  getRefinanceContract,
};

const INITIAL_STATE = Immutable.fromJS({
  refinanceds: [],
});

const ACTION_HANDLERS = {
  [GET_RECOVERIES.REQUEST]: (state, {payload}) =>
    state.set('refinanceds', Immutable.fromJS([])),
  [GET_RECOVERIES.SET]: (state, {payload}) =>
    state.set('refinanceds', Immutable.fromJS(payload)),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
