import createReducer from 'redux/create-reducer';
import {GET_PROVIDERS, GET_PROVIDER, GET_PROVIDERS_NEW_PROVIDER} from 'actions/types';

const INITIAL_STATE = {
  providers: [],
  provider: {},
};

/**
 * Set payload for this reducer
 * @param {Object} state
 * @param {Object} providers
 */
const setPayload = (state, {providers}) => ({...state, ...providers});

const ACTION_HANDLERS = {
  [GET_PROVIDERS.SUCCESS]: setPayload,
  [GET_PROVIDER.REQUEST]: setPayload,
  [GET_PROVIDER.SUCCESS]: setPayload,
  [GET_PROVIDERS_NEW_PROVIDER.SUCCESS]: setPayload,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
