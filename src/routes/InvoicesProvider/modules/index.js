import createReducer from 'redux/create-reducer';
import {SEARCH_LOTS} from 'action-types';
import {setPayload} from 'redux/setPayload';

const INITIAL_STATE = {
  lots: [],
};

const ACTION_HANLDERS = {
  [SEARCH_LOTS.SET]: setPayload,
};

export default createReducer(INITIAL_STATE, ACTION_HANLDERS);
