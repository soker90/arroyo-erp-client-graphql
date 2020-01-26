import createReducer from 'redux/create-reducer';
import Immutable from 'immutable';
import axios from 'axios';

import {GET_RECOVERIES, SEND_RECOVERY_EMAIL_LIST} from 'action-types';

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

const sendEmailList = (emailList, templateId) => async dispatch => {
  dispatch({type: SEND_RECOVERY_EMAIL_LIST.REQUEST});

  try {
    const data = {emailList, templateId};
    const URL = '/comunication/sendBulkEmail';
    await axios.post(URL, data);

    dispatch({type: SEND_RECOVERY_EMAIL_LIST.SUCCESS});
  } catch (error) {
    console.error(error);
    dispatch({type: SEND_RECOVERY_EMAIL_LIST.FAILURE, error});
  }
};

export const actions = {
  getRecoveries,
  sendEmailList,
};

const INITIAL_STATE = Immutable.fromJS({
  recoveries: {},
});

const ACTION_HANDLERS = {
  [GET_RECOVERIES.REQUEST]: state =>
    state.set('recoveries', Immutable.fromJS({})),
  [GET_RECOVERIES.SET]: (state, {payload}) =>
    state.set('recoveries', Immutable.fromJS(payload)),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
