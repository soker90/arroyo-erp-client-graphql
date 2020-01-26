import createReducer from 'redux/create-reducer';
import Immutable, {List} from 'immutable';
import axios from 'axios';
import _ from 'lodash';
import convertParams from 'utils/object-to-params';

import {
  SEARCH_REMITTANCE_RECEIPTS,
  RECEIPTS_CLEAR,
  SET_OPERATION_COD,
  SEARCH_REMITTANCE,
} from 'action-types';

export const searchRemittance = data => async dispatch => {
  dispatch({type: SEARCH_REMITTANCE.REQUEST});

  try {
    const URL = `/remittanceReceipts/filter?${convertParams(data)}`;
    const response = await axios(URL);

    dispatch({type: SEARCH_REMITTANCE.SUCCESS});
    dispatch({type: SEARCH_REMITTANCE.SET, payload: response.data[0]});
  } catch (error) {
    console.error(error);
    dispatch({type: SEARCH_REMITTANCE.FAILURE, error});
  }
};

export const searchReceipts = data => async dispatch => {
  dispatch({type: RECEIPTS_CLEAR.SET});
  const body = _.pick(data, ['remittance']);
  dispatch({type: SEARCH_REMITTANCE_RECEIPTS.REQUEST});

  try {
    const URL = `/receipt/filter?${convertParams(body)}`;
    const response = await axios(URL);

    dispatch({type: SEARCH_REMITTANCE_RECEIPTS.SUCCESS});
    dispatch({type: SEARCH_REMITTANCE_RECEIPTS.SET, payload: response.data});
  } catch (error) {
    console.error(error);
    dispatch({type: SEARCH_REMITTANCE_RECEIPTS.FAILURE, error});
  }
};

export const clearReceipts = () => dispatch => {
  dispatch({type: RECEIPTS_CLEAR.SET});
};

export const setOperationCod = (remittanceReceiptsId, operationCod) => async dispatch => {
  dispatch({type: SET_OPERATION_COD.REQUEST});

  try {
    await axios.put(
      `/remittanceReceipts/${remittanceReceiptsId}/codOperation/${operationCod}`
    );

    dispatch({
      type: SET_OPERATION_COD.SUCCESS,
      payload: {
        level: 'success',
        message: 'Código de operación actualizado',
      },
    });
  } catch (error) {
    console.error(error);
    dispatch({type: SET_OPERATION_COD.FAILURE, error});
  }
};

export const actions = {
  searchReceipts,
  clearReceipts,
  setOperationCod,
  searchRemittance,
};

const INITIAL_STATE = Immutable.fromJS({
  remittance: {},
  receipts: [],
});

const ACTION_HANDLERS = {
  [SEARCH_REMITTANCE.SET]: (state, {payload}) =>
    state.set('remittance', Immutable.fromJS(payload)),
  [SEARCH_REMITTANCE_RECEIPTS.SET]: (state, {payload}) =>
    state.set('receipts', List(_.uniqBy(payload, 'codReceipt'))),
  [RECEIPTS_CLEAR.SET]: state => state.set('receipts', List([])),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
