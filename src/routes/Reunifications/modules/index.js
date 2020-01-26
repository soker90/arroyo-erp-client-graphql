import createReducer from 'redux/create-reducer';
import {GET_REUNIFICATION_LIST} from 'action-types';
import {SET_REUNIFICATIONS_SELECTED} from './actions/types';

const INITIAL_STATE = {
  reunifications: [],
  reunificationsFilter: [
    {type: ['reu_gen', 'reu_ref', 'reu_des', 'reu_val'], text: 'Todas'},
    {type: ['reu_gen'], text: 'Pendientes'},
    {type: ['reu_val'], text: 'Aprobadas'},
    {type: ['reu_ref'], text: 'Rechazadas'},
    {type: ['reu_des'], text: 'Desistidas'},
  ],
  selected: {
    selectedIndex: 1,
    selectedItem: ['reu_gen'],
  },
};

const setPayload = (state, {payload}) => ({...state, ...payload});

const ACTION_HANDLERS = {
  [GET_REUNIFICATION_LIST.SET]: setPayload,
  [GET_REUNIFICATION_LIST.FAILURE]: setPayload,
  [SET_REUNIFICATIONS_SELECTED.SET]: setPayload,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
