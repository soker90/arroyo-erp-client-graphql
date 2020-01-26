import createReducer from 'redux/create-reducer';
import {GET_TEMPLATE_BY_ID, GET_TEMPLATES} from './types';

const INITIAL_STATE = {
  templateList: [],
  template: {},
};

const setPayload = (state, {payload}) => ({...state, ...payload});

const ACTION_HANLDERS = {
  [GET_TEMPLATES.REQUEST]: setPayload,
  [GET_TEMPLATES.SUCCESS]: setPayload,
  [GET_TEMPLATES.FAILURE]: setPayload,
  [GET_TEMPLATE_BY_ID.SUCCESS]: setPayload,
  [GET_TEMPLATE_BY_ID.FAILURE]: setPayload,
  [GET_TEMPLATE_BY_ID.REQUEST]: setPayload,
};

export default createReducer(INITIAL_STATE, ACTION_HANLDERS);
