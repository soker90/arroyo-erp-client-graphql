import createReducer from 'redux/create-reducer';
import Immutable, {List} from 'immutable';
import axios from 'axios';
import _ from 'lodash';

import {LOT_TRANSFERS, SET_OPERATION_COD, SEARCH_LOT} from 'action-types';

export const searchLot = codLot => async dispatch => {
  dispatch({type: SEARCH_LOT.REQUEST});

  try {
    const URL = `/lot/filter?codLot=${codLot}`;
    const response = await axios(URL);

    dispatch({type: SEARCH_LOT.SUCCESS});
    dispatch({type: SEARCH_LOT.SET, payload: response.data[0]});
  } catch (error) {
    console.error(error);
    dispatch({type: SEARCH_LOT.FAILURE, error});
  }
};

export const getTransfers = lotId => async dispatch => {
  dispatch({type: LOT_TRANSFERS.REQUEST});

  try {
    const response = await axios.get(`/transfer/transfersByLote/${lotId}`);

    dispatch({
      type: LOT_TRANSFERS.SUCCESS,
      payload: {
        level: 'success',
        message: `Transferencias del lote ${lotId} obtenidas.`,
      },
    });
    dispatch({type: LOT_TRANSFERS.SET, payload: response.data});
  } catch (error) {
    console.error(error);
    dispatch({type: LOT_TRANSFERS.FAILURE, error});
  }
};

export const setOperationCod = (lotId, operationCod) => async dispatch => {
  dispatch({type: SET_OPERATION_COD.REQUEST});

  try {
    await axios.put(`/lot/${lotId}/codOperation/${operationCod}`);

    dispatch({
      type: SET_OPERATION_COD.SUCCESS,
      payload: {
        level: 'success',
        message: `Asignado código de operacion para el lote ${lotId}.`,
      },
    });
  } catch (error) {
    console.error(error);
    dispatch({type: SET_OPERATION_COD.FAILURE, error});
  }
};

export const actions = {
  getTransfers,
  setOperationCod,
  searchLot,
};

const INITIAL_STATE = Immutable.fromJS({
  lot: {},
  transfers: [],
});

const ACTION_HANDLERS = {
  [LOT_TRANSFERS.REQUEST]: state => state.set('transfers', List([])),
  [LOT_TRANSFERS.SET]: (state, {payload}) =>
    state.set('transfers', List(_.uniqBy(payload, 'transferId'))),
  [SEARCH_LOT.SET]: (state, {payload}) =>
    state.set('lot', Immutable.fromJS(payload)),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
