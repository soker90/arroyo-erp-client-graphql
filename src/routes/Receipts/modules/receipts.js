import Immutable from 'immutable';
import axios from 'axios';
import {pick, omitBy, uniqBy} from 'lodash';
import createReducer from 'redux/create-reducer';
import {SEARCH_RECEIPTS} from 'action-types';
import convertParams from 'utils/object-to-params';

export const searchReceipts = data => async dispatch => {
  const variables = pick(data, [
    'dateIni',
    'dateEnd',
    'codReceipt',
    'codStatus',
  ]);
  const body = omitBy(
    variables,
    v => typeof v === 'undefined' || v === null || v === ''
  );
  dispatch({type: SEARCH_RECEIPTS.REQUEST});
  try {
    const URL = `/receipt/filter?${convertParams(body)}`;
    const response = await axios(URL);

    dispatch({type: SEARCH_RECEIPTS.SUCCESS});
    dispatch({type: SEARCH_RECEIPTS.SET, payload: response.data});
  } catch (error) {
    console.log(error);
    dispatch({type: SEARCH_RECEIPTS.FAILURE, error});
  }
};

export const actions = {
  searchReceipts,
};

const INITIAL_STATE = Immutable.fromJS({
  receipts: [],
});

const ACTION_HANLDERS = {
  [SEARCH_RECEIPTS.SET]: (state, {payload}) =>
    state.set('receipts', Immutable.List(uniqBy(payload, 'codReceipt'))),
};

export default createReducer(INITIAL_STATE, ACTION_HANLDERS);
