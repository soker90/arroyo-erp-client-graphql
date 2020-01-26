import Immutable, {List} from 'immutable';
import axios from 'axios';
import _ from 'lodash';
import createReducer from 'redux/create-reducer';
import {showModal} from 'reducers/modal';
import convertParams from 'utils/object-to-params';

import {
  SEARCH_REMITTANCES,
  SEARCH_REMITTANCE_RECEIPTS,
  DOWNLOAD_REMITTANCES,
} from 'action-types';

export const searchRemittances = data => async dispatch => {
  const variables = _.pick(data, ['generationDate', 'codRemitance', 'cod']);
  const body = _.omitBy(
    variables,
    v => typeof v === 'undefined' || v === null || v === ''
  );
  dispatch({type: SEARCH_REMITTANCES.REQUEST});

  try {
    const URL = `/remittanceReceipts/filter?${convertParams(body)}`;
    const response = await axios(URL);

    dispatch({type: SEARCH_REMITTANCES.SUCCESS});
    // TODO add pagination
    dispatch({
      type: SEARCH_REMITTANCES.SET,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({type: SEARCH_REMITTANCES.FAILURE, error});
  }
};

export const downloadRemittances = id => async dispatch => {
  dispatch({type: DOWNLOAD_REMITTANCES.REQUEST});

  try {
    const URL = `remittanceReceipts/download/${id}`;
    const response = await axios(URL, {responseType: 'blob'});

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', response.headers.filename);
    document.body.appendChild(link);
    link.click();

    dispatch({
      type: DOWNLOAD_REMITTANCES.SUCCESS,
      payload: {
        level: 'success',
        title: 'Descarga disponible',
      },
    });
  } catch (error) {
    console.error(error);
    dispatch({type: DOWNLOAD_REMITTANCES.FAILURE});
  }
};

const showRemittancesModal = remittance => dispatch => {
  dispatch(
    showModal({
      modalType: 'SHOW_REMMITANCES_MODAL',
      modalProps: {remittance},
    })
  );
};

export const actions = {
  searchRemittances,
  showRemittancesModal,
  downloadRemittances,
};

const INITIAL_STATE = Immutable.fromJS({
  remittances: [],
  receipts: [],
});

const ACTION_HANLDERS = {
  [SEARCH_REMITTANCES.SET]: (state, {payload}) =>
    state.set('remittances', List(_.uniqBy(payload, 'remittanceReceiptsId'))),
  [SEARCH_REMITTANCE_RECEIPTS.SET]: (state, {payload}) =>
    state.set('receipts', List(_.uniqBy(payload, 'codReceipt'))),
};

export default createReducer(INITIAL_STATE, ACTION_HANLDERS);
