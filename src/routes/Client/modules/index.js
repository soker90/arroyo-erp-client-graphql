import {CLIENT} from 'action-types';
import createReducer from 'redux/create-reducer';
import {FETCH_REFINANCE_CONTRACT_BY_CLIENT_ID} from './types';
import {setPayload} from 'redux/setPayload';

const INITIAL_STATE = {
  clientId: null,
  client: {},
  dniImages: {},
  coDniImages: {},
  communications: [],
  communication: {},
  contracts: [],
  contract: {},
  receipts: [],
  receipt: {},
  prescriber: {},
  recovery: {},
  contactInfo: [],
  refinanced: '',
  isRefinanced: false,
};

const ACTION_HANLDERS = {
  [CLIENT.RESET]: () => INITIAL_STATE,
  [CLIENT.GET.SET]: setPayload,
  [CLIENT.GET_IMAGES.REQUEST]:setPayload,
  [CLIENT.GET_IMAGES.SET]: setPayload,
  [CLIENT.GET_CO_IMAGES.REQUEST]: setPayload,
  [CLIENT.GET_CO_IMAGES.SET]: setPayload,
  [CLIENT.GET_RECOVERY.REQUEST]: setPayload,
  [CLIENT.GET_RECOVERY.SET]: setPayload,
  [CLIENT.CONTRACTS.SET]: setPayload,
  [CLIENT.COMMUNICATIONS.SET]: setPayload,
  [CLIENT.COMMUNICATION.REQUEST]: setPayload,
  [CLIENT.COMMUNICATION.SET]: setPayload,
  [CLIENT.CONTRACT.REQUEST]: setPayload,
  [CLIENT.CONTRACT.SET]: setPayload,
  [CLIENT.RECEIPTS.REQUEST]: setPayload,
  [CLIENT.RECEIPTS.SET]: setPayload,
  [CLIENT.RECEIPT.REQUEST]: setPayload,
  [CLIENT.RECEIPT.SET]: setPayload,
  [CLIENT.PRESCRIBER.REQUEST]: setPayload,
  [CLIENT.PRESCRIBER.SET]: setPayload,
  [CLIENT.GET_CONTACT_INFO.REQUEST]: setPayload,
  [CLIENT.GET_CONTACT_INFO.SET]: setPayload,
  [CLIENT.GET_CONTACT_INFO.FAILURE]: setPayload,
  [CLIENT.SET_CONTACT_INFO.SET]: setPayload,
  [CLIENT.SET_CONTACT_INFO.FAILURE]: setPayload,
  [CLIENT.REFINANCED.SET]: setPayload,
  [FETCH_REFINANCE_CONTRACT_BY_CLIENT_ID.SUCCESS]:setPayload,
};

export default createReducer(INITIAL_STATE, ACTION_HANLDERS);
