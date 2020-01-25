import {has} from 'lodash';

export default function createReducer(INITIAL_STATE, handlers) {
  return function reducer(state = INITIAL_STATE, action) {
    if (has(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}
