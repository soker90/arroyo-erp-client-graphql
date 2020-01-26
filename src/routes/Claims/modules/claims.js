import createReducer from 'redux/create-reducer';
import Immutable from 'immutable';
import axios from 'axios';
import moment from 'moment';

import {RECOVER_JUDICIAL} from 'action-types';

export const getRecoveries = () => async dispatch => {
  dispatch({type: RECOVER_JUDICIAL.REQUEST});
  try {
    const response = await axios({url: '/recovery/getRecoveries'});
    dispatch({type: RECOVER_JUDICIAL.SUCCESS});
    dispatch({type: RECOVER_JUDICIAL.SET, payload: response.data});
  } catch (error) {
    console.log(error);
    dispatch({type: RECOVER_JUDICIAL.FAILURE, error});
  }
};

export const actions = {
  getRecoveries,
};

function buildBoxesByDate(payload) {
  const claims = [];

  for (let i = 0; i < payload.length; ++i) {
    const current = payload[i];
    if (!current.nextProcess) {
      continue;
    }

    const date = moment(current.nextProcess);
    const todayStart = moment().startOf('day');
    const moreThan90 = moment(todayStart).subtract(90, 'day');

    if (date >= moreThan90) {
      claims.push(current);
    }
  }

  claims.sentToLayer = true;
  return claims;
}

const INITIAL_STATE = Immutable.fromJS({
  claims: [],
});

const ACTION_HANDLERS = {
  [RECOVER_JUDICIAL.SET]: (state, {payload}) =>
    state.set('claims', Immutable.fromJS(buildBoxesByDate(payload))),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
