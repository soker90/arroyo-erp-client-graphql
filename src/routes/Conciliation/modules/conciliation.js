import {replace} from 'react-router-redux';
import axios from 'axios';
import createReducer from 'redux/create-reducer';
import {
  CON_SET_INCOME,
  CON_UNSET_INCOME,
  UPLOAD_CONCILIATION,
  APPLY_CONCILIATION,
  PENDING_REMITTANCES,
  PENDING_TRANSFERS,
  UNPAID_RECEIPTS,
  PENDING_INCOMES,
  PENDING_TPV,
} from 'action-types';
import {showModal} from '../../../reducers/modal';

const BASE_PATH = process.env.NERA_ROUTER_BASE_PATH;

export const uploadConciliation = file => async dispatch => {
  const formData = new FormData();
  formData.append('file', file);
  const headers = {'Content-Type': 'multipart/form-data'};
  dispatch({type: UPLOAD_CONCILIATION.REQUEST});
  try {
    const response = await axios({
      url: '/conciliate/uploadFile',
      method: 'POST',
      headers,
      data: formData,
    });
    dispatch({type: UPLOAD_CONCILIATION.SUCCESS});
    dispatch({type: UPLOAD_CONCILIATION.SET, payload: response.data});
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPLOAD_CONCILIATION.FAILURE,
      error,
      title: 'ERROR al procesar el fichero',
    });
  }
};

export const applyConciliation = file => async dispatch => {
  const formData = new FormData();
  formData.append('file', file);
  const headers = {'Content-Type': 'multipart/form-data'};
  dispatch({type: APPLY_CONCILIATION.REQUEST});
  try {
    const response = await axios({
      url: '/conciliate/conciliateFile',
      method: 'POST',
      headers,
      data: formData,
    });

    dispatch({type: APPLY_CONCILIATION.SUCCESS});
    dispatch({type: APPLY_CONCILIATION.SET, payload: response.data});
  } catch (error) {
    console.log(error);
    dispatch({
      type: APPLY_CONCILIATION.FAILURE,
      error,
      title: 'ERROR al conciliar',
    });
  }
};

export const getPendingRemittances = () => async dispatch => {
  dispatch({type: PENDING_REMITTANCES.REQUEST});
  try {
    const response = await axios({url: '/remittanceReceipts/unpaid'});

    dispatch({type: PENDING_REMITTANCES.SUCCESS});
    dispatch({
      type: PENDING_REMITTANCES.SET,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PENDING_REMITTANCES.FAILURE,
      error,
      title: 'ERROR remesas pendientes',
    });
  }
};

export const getPendingTransfers = () => async dispatch => {
  dispatch({type: PENDING_TRANSFERS.REQUEST});
  try {
    const response = await axios({url: '/transfer/transfersPending'});
    dispatch({type: PENDING_TRANSFERS.SUCCESS});
    dispatch({
      type: PENDING_TRANSFERS.SET,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PENDING_TRANSFERS.FAILURE,
      error,
      title: 'ERROR transferencias pendientes',
    });
  }
};

export const getUnpaidReceipts = () => async dispatch => {
  dispatch({type: UNPAID_RECEIPTS.REQUEST});
  try {
    const response = await axios({url: '/unpaidReceipt/'});
    dispatch({type: UNPAID_RECEIPTS.SUCCESS});
    dispatch({type: UNPAID_RECEIPTS.SET, payload: response.data});
  } catch (error) {
    console.log(error);
    dispatch({
      type: UNPAID_RECEIPTS.FAILURE,
      error,
      title: 'ERROR recibos impagados',
    });
  }
};

export const getPendingIncomes = () => async dispatch => {
  dispatch({type: PENDING_INCOMES.REQUEST});
  try {
    const response = await axios({url: '/income/incomePending'});
    dispatch({type: PENDING_INCOMES.SUCCESS});
    dispatch({type: PENDING_INCOMES.SET, payload: response.data});
  } catch (error) {
    console.log(error);
    dispatch({
      type: PENDING_INCOMES.FAILURE,
      error,
      title: 'ERROR ingresos pendientes',
    });
  }
};

export const getPendingTpv = () => async dispatch => {
  dispatch({type: PENDING_TPV.REQUEST});
  try {
    const response = await axios({url: '/tpv/pending'});
    dispatch({type: PENDING_TPV.SUCCESS});
    dispatch({type: PENDING_TPV.SET, payload: response.data});
  } catch (error) {
    console.log(error);
    dispatch({
      type: PENDING_TPV.FAILURE,
      error,
      title: 'ERROR ingresos pendientes',
    });
  }
};

export const setSelectedIncome = income => dispatch => {
  dispatch({type: CON_SET_INCOME, income});
  dispatch(replace(`${BASE_PATH}/finance/operations/paymentapplication`));
};

export const clearSelectedIncome = () => dispatch => {
  dispatch({type: CON_UNSET_INCOME});
};

export const showErrorControlModal = ops => dispatch => {
  dispatch(
    showModal({
      modalType: 'ERROR_CONTROL_MODAL',
      modalProps: {registeredOps: ops},
    })
  );
};

export const actions = {
  getPendingRemittances,
  getPendingTransfers,
  getUnpaidReceipts,
  getPendingIncomes,
  uploadConciliation,
  applyConciliation,
  setSelectedIncome,
  clearSelectedIncome,
};

const INITIAL_STATE = {
  fileSummary: {},
  registeredOps: null,
  pendingRemittances: [],
  pendingTransfers: [],
  unpaidReceipts: [],
  pendingIncomes: [],
  possibleClients: [],
  selectedIncome: {},
  pendingTpv: [],
};

const ACTION_HANLDERS = {
  [UPLOAD_CONCILIATION.SET]: (state, {payload}) => ({...state, fileSummary: payload}),
  [APPLY_CONCILIATION.SET]: (state, {payload}) => ({...state, registeredOps: payload}),
  [PENDING_REMITTANCES.SET]: (state, {payload}) => ({...state, pendingRemittances: payload}),
  [PENDING_TRANSFERS.SET]: (state, {payload}) => ({...state, pendingTransfers: payload}),
  [UNPAID_RECEIPTS.SET]: (state, {payload}) => ({...state, unpaidReceipts: payload}),
  [PENDING_INCOMES.SET]: (state, {payload}) => ({...state, pendingIncomes: payload}),
  [PENDING_TPV.SET]: (state, {payload}) => ({...state, pendingTpv: payload}),
  [CON_SET_INCOME]: (state, {income}) => ({...state, selectedIncome: income}),
  [CON_UNSET_INCOME]: state => ({...state, selectedIncome: null}),
};

export default createReducer(INITIAL_STATE, ACTION_HANLDERS);
