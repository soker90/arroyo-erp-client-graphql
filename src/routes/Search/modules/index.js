import {SEARCH} from 'action-types';
import createReducer from 'redux/create-reducer';
import {setPayload} from 'redux/setPayload';

const INITIAL_STATE = {
  clients: [],
};

const ACTION_HANDLERS = {
  [SEARCH.REQUEST]: () => INITIAL_STATE,
  [SEARCH.SUCCESS]: setPayload,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
