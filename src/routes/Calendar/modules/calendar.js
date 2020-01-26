import createReducer from 'redux/create-reducer';
import Immutable from 'immutable';
import axios from 'axios';
import moment from 'moment';

import {RECOVER_CALENDAR, CLIENT} from 'action-types';

export const getRecoveries = () => async dispatch => {
  dispatch({type: RECOVER_CALENDAR.REQUEST});
  try {
    const response = await axios({url: '/recovery/getRecoveries'});
    dispatch({type: RECOVER_CALENDAR.SUCCESS});
    dispatch({type: RECOVER_CALENDAR.SET, payload: response.data});
  } catch (error) {
    console.log(error);
    dispatch({type: RECOVER_CALENDAR.FAILURE, error});
  }
};

export const updateRecoveries = () => async dispatch => {
  dispatch({type: CLIENT.UPDATE_RECOVERIES.REQUEST});
  try {
    await axios({method: 'POST', url: '/recovery/updateRecoveries'});

    dispatch({
      type: CLIENT.UPDATE_RECOVERIES.SUCCESS,
      payload: {
        level: 'success',
        message: 'Lista de recobros actualizada.',
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({type: CLIENT.UPDATE_RECOVERIES.FAILURE, error});
  }
};

export const actions = {
  getRecoveries,
  updateRecoveries,
};

function buildBoxesByDate(payload) {
  const recoveries = {
    DELAYED: [],
    TODAY: [],
    TOMORROW: [],
    FUTURE: [],
  };

  const todayStart = moment().startOf('day');
  const todayEnd = moment().endOf('day');
  const tomorrowStart = moment(todayStart).add(1, 'day');
  const tomorrowEnd = moment(todayEnd).add(1, 'day');
  let box;

  for (let i = 0; i < payload.length; ++i) {
    const current = payload[i];
    if (!current.nextProcess) {
      recoveries.DELAYED.push(current);
      continue;
    }

    const date = moment(current.nextProcess);

    if (date < todayStart) {
      box = 'DELAYED';
    } else if (date >= todayStart && date <= todayEnd) {
      box = 'TODAY';
    } else if (date >= tomorrowStart && date <= tomorrowEnd) {
      box = 'TOMORROW';
    } else {
      box = 'FUTURE';
    }

    recoveries[box].push(current);
  }

  return recoveries;
}

const INITIAL_STATE = Immutable.fromJS({
  recoveries: {
    DELAYED: [],
    TODAY: [],
    TOMORROW: [],
    FUTURE: [],
  },
});

const ACTION_HANDLERS = {
  [RECOVER_CALENDAR.SET]: (state, {payload}) =>
    state.set('recoveries', Immutable.fromJS(buildBoxesByDate(payload))),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
