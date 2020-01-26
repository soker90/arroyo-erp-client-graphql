import {CLEAR_RECEIPT, GET_RECEIPT}       from 'action-types';
import createReducer                      from 'redux/create-reducer';
import {GET_AMOUNT_TPV, SEND_PAYMENT_TPV} from './types';

const INITIAL_STATE = {
  receipt: {},
};

const setPayload = (state, {payload}) => ({...state, ...payload});

const ACTION_HANLDERS = {
  [GET_RECEIPT.SET]: setPayload,
  [CLEAR_RECEIPT]: state => ({...state, receipt: {}}),
  [GET_AMOUNT_TPV.SUCCESS]: setPayload,
  [SEND_PAYMENT_TPV.SUCCESS]: setPayload,
  [SEND_PAYMENT_TPV.FAILURE]: setPayload,
  [SEND_PAYMENT_TPV.REQUEST]: setPayload,
};

export default createReducer(INITIAL_STATE, ACTION_HANLDERS);
