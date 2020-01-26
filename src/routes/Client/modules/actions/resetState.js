import {CLIENT} from 'action-types';

/**
 * Reset data client of redux
 * @returns {function(...[*]=)}
 */
export const resetState = () => dispatch => {
  dispatch({type: CLIENT.RESET});
};