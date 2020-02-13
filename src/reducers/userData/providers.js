import createReducer from 'redux/create-reducer';
import {GET_INIT_DATA} from '../../actions/types';

const INITIAL_STATE = {
  all: [],
};

const ACTION_HANDLERS = {
  [GET_INIT_DATA.SUCCESS]: (state, {providers}) => ({...state, ...providers}),
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
