import Immutable from 'immutable';
import axios from 'axios';
import createReducer from 'redux/create-reducer';
import {get} from 'lodash';
import {UPLOAD_CSV} from 'action-types';

import browserHistory from 'redux/history';

export const uploadCSV = (file, callback) => dispatch => {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  } else {
    return;
  }

  dispatch({type: UPLOAD_CSV.REQUEST});
  return axios({
    url: '/import/csv',
    method: 'put',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => {
      dispatch({type: UPLOAD_CSV.SUCCESS});
      if (response.data) {
        browserHistory.push(
          `${process.env.NERA_ROUTER_BASE_PATH}/client/${
            response.data.clientId
          }`
        );
      }
    })
    .catch(error => {
      console.error(error);
      dispatch({type: UPLOAD_CSV.FAILURE, error, title: 'ERROR: importar CSV'});
      if (callback) {
        callback();
      }
    });
};

export const uploadJSON = (file, callback) => dispatch => {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  } else {
    return;
  }

  dispatch({type: UPLOAD_CSV.REQUEST});
  return axios({
    url: '/import/json',
    method: 'put',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => {
      dispatch({type: UPLOAD_CSV.SUCCESS});
      if (response.data) {
        browserHistory.push(
          `${process.env.NERA_ROUTER_BASE_PATH}/client/${
            response.data.clientId
          }`
        );
      }
    })
    .catch(error => {
      console.error(error);
      dispatch({type: UPLOAD_CSV.FAILURE, error, title: 'ERROR: importar JSON'});
      if (callback) {
        callback();
      }
    });
};

export const actions = {
  uploadCSV,
  uploadJSON,
};

const INITIAL_STATE = Immutable.fromJS({
  payloadErrors: null,
});

const ACTION_HANLDERS = {
  [UPLOAD_CSV.REQUEST]: () => INITIAL_STATE,
  [UPLOAD_CSV.FAILURE]: (state, {error}) =>
    state.set(
      'payloadErrors',
      Immutable.fromJS(get(error, 'response.data', null))
    ),
};

export default createReducer(INITIAL_STATE, ACTION_HANLDERS);
