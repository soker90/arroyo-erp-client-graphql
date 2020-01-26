import Immutable from 'immutable';
import {CLIENT} from 'action-types';
import createReducer from 'redux/create-reducer';
import {FETCH_REFINANCE_CONTRACT_BY_CLIENT_ID} from './types';

const INITIAL_STATE = Immutable.fromJS({
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
});

const ACTION_HANLDERS = {
  [CLIENT.RESET]: () => INITIAL_STATE,
  [CLIENT.GET.SET]: (state, {payload, clientId}) =>
    state.set('client', Immutable.fromJS(payload)).set('clientId', clientId),
  [CLIENT.GET_IMAGES.REQUEST]: state =>
    state.set('dniImages', Immutable.fromJS({})),
  [CLIENT.GET_IMAGES.SET]: (state, {payload}) =>
    state.set(
      'dniImages',
      Immutable.fromJS({
        front: payload.front ? `data:image/jpeg;base64,${payload.front}` : null,
        back: payload.back ? `data:image/jpeg;base64,${payload.back}` : null,
      })
    ),
  [CLIENT.GET_CO_IMAGES.REQUEST]: state =>
    state.set('coDniImages', Immutable.fromJS({})),
  [CLIENT.GET_CO_IMAGES.SET]: (state, {payload}) =>
    state.set(
      'coDniImages',
      Immutable.fromJS({
        // TODO Pendiente de recibir de back el objeto (LEN-848)
        cofront: payload.cofront ? `data:image/jpeg;base64,${payload.cofront}`: null,
        coback: payload.coback ? `data:image/jpeg;base64,${payload.coback}` : null,
      })
    ),
  [CLIENT.GET_RECOVERY.REQUEST]: state =>
    state.set('recovery', Immutable.fromJS({})),
  [CLIENT.GET_RECOVERY.SET]: (state, {payload}) =>
    state.set('recovery', Immutable.fromJS(payload)),
  [CLIENT.CONTRACTS.SET]: (state, {payload}) =>
    state.set('contracts', Immutable.List(payload)),
  [CLIENT.COMMUNICATIONS.SET]: (state, {payload}) =>
    state.set('communications', Immutable.List(payload)),
  [CLIENT.COMMUNICATION.REQUEST]: state =>
    state.set('communication', Immutable.fromJS({})),
  [CLIENT.COMMUNICATION.SET]: (state, {payload}) =>
    state.set('communication', Immutable.fromJS(payload)),
  [CLIENT.CONTRACT.REQUEST]: state =>
    state.set('contract', Immutable.fromJS({})),
  [CLIENT.CONTRACT.SET]: (state, {payload}) =>
    state.set('contract', Immutable.fromJS(payload)),
  [CLIENT.RECEIPTS.REQUEST]: state =>
    state.set('receipts', Immutable.List([])),
  [CLIENT.RECEIPTS.SET]: (state, {payload}) =>
    state.set('receipts', Immutable.List(payload || [])),
  [CLIENT.RECEIPT.REQUEST]: state =>
    state.set('receipt', Immutable.fromJS({})),
  [CLIENT.RECEIPT.SET]: (state, {payload}) =>
    state.set('receipt', Immutable.fromJS(payload)),
  [CLIENT.PRESCRIBER.REQUEST]: state =>
    state.set('prescriber', Immutable.fromJS({})),
  [CLIENT.PRESCRIBER.SET]: (state, {payload}) =>
    state.set('prescriber', Immutable.fromJS(payload)),
  [CLIENT.GET_CONTACT_INFO.REQUEST]: state =>
    state.set('contactInfo', Immutable.fromJS([])),
  [CLIENT.GET_CONTACT_INFO.SET]: (state, {payload}) =>
    state.set('contactInfo', Immutable.fromJS(payload)),
  [CLIENT.GET_CONTACT_INFO.FAILURE]: state =>
    state.set('contactInfo', Immutable.fromJS([])),
  [CLIENT.SET_CONTACT_INFO.SET]: (state, {payload}) =>
    state.update('contactInfo', contactInfo => contactInfo.push(payload)),
  [CLIENT.SET_CONTACT_INFO.FAILURE]: state =>
    state.set('contactInfo', Immutable.fromJS([])),
  [CLIENT.REFINANCED.SET]: (state, {payload}) =>
    state.set('refinanced', payload),
  [FETCH_REFINANCE_CONTRACT_BY_CLIENT_ID.SUCCESS]: (state, {payload}) =>
    state.set('isRefinanced', payload),
};

export default createReducer(INITIAL_STATE, ACTION_HANLDERS);
