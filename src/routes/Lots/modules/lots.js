import Immutable, {List} from 'immutable';
import axios from 'axios';
import _ from 'lodash';
import createReducer from 'redux/create-reducer';
import convertParams from 'utils/object-to-params';

import {SEARCH_LOTS, DOWNLOAD_LOTS} from 'action-types';

export const searchLots = data => async dispatch => {
  const variables = _.pick(data, ['generationDate', 'codLot']); // REVISAR
  const body = _.omitBy(
    variables,
    v => typeof v === 'undefined' || v === null || v === ''
  );
  dispatch({type: SEARCH_LOTS.REQUEST});

  try {
    const URL = `/lot/filter?${convertParams(body)}`;
    const response = await axios(URL);

    dispatch({type: SEARCH_LOTS.SUCCESS});
    dispatch({type: SEARCH_LOTS.SET, payload: response.data});
  } catch (error) {
    console.error(error);
    dispatch({type: SEARCH_LOTS.FAILURE, error});
  }
};

export const downloadLots = id => async dispatch => {
  dispatch({type: DOWNLOAD_LOTS.REQUEST});

  try {
    const URL = `${process.env.NERA_API_HOST}/lot/download/${id}`;
    const response = await axios(URL, {responseType: 'blob'});

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', response.headers.filename);
    document.body.appendChild(link);
    link.click();

    dispatch({
      type: DOWNLOAD_LOTS.SUCCESS,
      payload: {
        level: 'success',
        title: 'Descarga disponible',
      },
    });
  } catch (error) {
    console.error(error);
    dispatch({type: DOWNLOAD_LOTS.FAILURE});
  }
};

export const downloadLotMovements = id => async dispatch => {
  dispatch({type: DOWNLOAD_LOTS.REQUEST});

  try {
    const URL = `${process.env.NERA_API_HOST}/lot/downloadMovement/${id}`;
    const response = await axios(URL, {responseType: 'blob'});

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', response.headers.filename);
    document.body.appendChild(link);
    link.click();

    dispatch({
      type: DOWNLOAD_LOTS.SUCCESS,
      payload: {
        level: 'success',
        title: 'Descarga disponible',
      },
    });
  } catch (error) {
    console.error(error);
    dispatch({type: DOWNLOAD_LOTS.FAILURE});
  }
};

export const actions = {
  searchLots,
  downloadLots,
};

const initialState = Immutable.fromJS({
  lots: [],
});

const ACTION_HANLDERS = {
  [SEARCH_LOTS.SET]: (state, {payload}) =>
    state.set('lots', List(_.uniqBy(payload, 'codLot'))),
};

export default createReducer(initialState, ACTION_HANLDERS);
