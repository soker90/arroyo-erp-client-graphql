import createReducer from 'redux/create-reducer';
import Immutable from 'immutable';
import axios from 'axios';

import {GET_RECOVERIES} from 'action-types';
import {GET_RECOVERIES_UNREAD} from './types';

export const getRecoveries = () => async dispatch => {
  dispatch({type: GET_RECOVERIES.REQUEST});
  try {
    const response = await axios({
      url: '/recovery/getRecoveries',
      baseURL: process.env.NERA_API_HOST,
    });

    dispatch({type: GET_RECOVERIES.SUCCESS});
    dispatch({type: GET_RECOVERIES.SET, payload: response.data});
  } catch (error) {
    console.error(error);
    dispatch({type: GET_RECOVERIES.FAILURE, error});
  }
};

function buildBoxesByDate(payload) {
  const recoveries = {
    ZERO: [],
    THIRTY: [],
    SIXTY: [],
    NINETY: [],
    HUNDRED_EIGHTY: [],
  };

  let box;

  for (let i = 0; i < payload.length; ++i) {
    const current = payload[i];

    if (current.debtDays < 30) {
      box = 'ZERO';
    } else if (current.debtDays >= 30 && current.debtDays < 60) {
      box = 'THIRTY';
    } else if (current.debtDays >= 60 && current.debtDays < 90) {
      box = 'SIXTY';
    } else if (current.debtDays >= 90 && current.debtDays < 180) {
      box = 'NINETY';
    } else if (current.debtDays >= 180) {
      box = 'HUNDRED_EIGHTY';
    } else {
      continue;
    }

    current.id = i;
    current.gestor = 'Amparo';
    current.messagesNumber = 0;
    recoveries[box].push(current);
  }

  return recoveries;
}

export const actions = {
  getRecoveries,
};

const INITIAL_STATE = Immutable.fromJS({
  recoveries: {
    ZERO: [],
    THIRTY: [],
    SIXTY: [],
    NINETY: [],
    HUNDRED_EIGHTY: [],
  },
  unread: [],
});

const ACTION_HANDLERS = {
  [GET_RECOVERIES.REQUEST]: (state, {payload}) =>
    state.set('recoveries', Immutable.fromJS({})),
  [GET_RECOVERIES.SET]: (state, {payload}) =>
    state.set('recoveries', Immutable.fromJS(buildBoxesByDate(payload))),
  [GET_RECOVERIES_UNREAD.SUCCESS]: (state, {payload: {unread}}) =>
    state.set('unread', Immutable.fromJS(unread)),
  [GET_RECOVERIES_UNREAD.REQUEST]: state =>
    state.set('unread', Immutable.fromJS([])),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
