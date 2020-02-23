import createReducer from 'redux/create-reducer';
import {GET_INIT_DATA, GET_PROVIDER} from 'actions/types';

const INITIAL_STATE = {
  all: [],
  provider: {},
};

const ACTION_HANDLERS = {
  [GET_INIT_DATA.SUCCESS]: (state, {providers}) => ({...state, ...providers}),
  [GET_PROVIDER.REQUEST]: (state, {providers}) => ({...state, ...providers}),
  [GET_PROVIDER.SUCCESS]: (state, {providers}) => ({...state, ...providers}),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
