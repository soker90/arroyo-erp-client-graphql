import {
  APPLY_PAYMENT,
  PA_CLIENT_COMMUNICATIONS,
  PA_CONTRACTS,
  PA_INCOMES,
  PA_RESET,
  PA_SET_CLIENTID,
  PA_SET_CONTRACT,
  PA_SET_INCOME,
  PA_SET_STEP, POSSIBLE_CLIENTS,
} from 'action-types';
import createReducer from 'redux/create-reducer';
import {STEPS} from './actions';
import {GET_PAYMENTS} from './types';
import {setPayload} from 'redux/setPayload';

const INITIAL_STATE = {
  step: STEPS.INCOMES,
  incomes: [],
  income: {},
  clientId: null,
  possibleClients: [],
  communications: [],
  contracts: [],
  contract: {},
  payReceipt: {},
  payments: [],
};

const ACTION_HANDLERS = {
  [PA_RESET]: (state, {step}) => INITIAL_STATE,
  [PA_SET_STEP]: (state, {step}) => ({...state, step}),
  [PA_SET_INCOME]: (state, {income}) => ({...state, income}),
  [PA_SET_CONTRACT]: (state, {contract}) => ({...state, contract}),
  [PA_SET_CLIENTID]: (state, {clientId}) => ({...state, clientId}),
  [PA_INCOMES.SET]: (state, {payload}) => ({...state, incomes: payload}),
  [PA_CONTRACTS.REQUEST]: state => ({...state, contracts: [], contract: {}}),
  [PA_CONTRACTS.SET]: (state, {payload}) => ({...state, contracts: payload}),
  [POSSIBLE_CLIENTS.SET]: (state, {payload}) => ({...state, possibleClients: payload}),
  [PA_CLIENT_COMMUNICATIONS.REQUEST]: state => ({...state, communications: []}),
  [PA_CLIENT_COMMUNICATIONS.SET]: (state, {payload}) => ({...state, communications: payload}),
  [APPLY_PAYMENT.SET]: (state, {payload}) => ({...state, payReceipt: payload}),
  [GET_PAYMENTS.SUCCESS]: setPayload,
  [GET_PAYMENTS.FAILURE]: setPayload,
  [GET_PAYMENTS.REQUEST]: setPayload,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);