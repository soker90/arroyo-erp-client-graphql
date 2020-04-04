import createReducer from 'redux/create-reducer';

import {ADD_HISTORY_TAB, REMOVE_HISTORY_TAB} from 'action-types';

export const addHistoryTab = tab => {
  return {type: ADD_HISTORY_TAB, tab};
};

export const removeHistoryTab = indexTab => ({type: REMOVE_HISTORY_TAB, indexTab});

const INITIAL_STATE = [];

const ACTION_HANDLERS = {
  [ADD_HISTORY_TAB]: (state, {tab}) => {
    const history = [tab, ...state];
    if (history.length > 20)
      history.pop();
    return history;
  },

  [REMOVE_HISTORY_TAB]: (state, {indexTab}) => {
    let history = state;
    history.splice(indexTab, 1);
    return history;
  },
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
