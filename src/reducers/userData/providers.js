import createReducer from 'redux/create-reducer';
import {GET_PROVIDERS, GET_PROVIDER} from 'actions/types';

const INITIAL_STATE = {
  providers: [],
  provider: {},
};

const ACTION_HANDLERS = {
  [GET_PROVIDERS.SUCCESS]: (state, {providers}) => ({...state, ...providers}),
  [GET_PROVIDER.REQUEST]: (state, {providers}) => ({...state, ...providers}),
  [GET_PROVIDER.SUCCESS]: (state, {providers}) => ({...state, ...providers}),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
