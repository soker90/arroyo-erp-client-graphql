import {SET_REUNIFICATIONS_SELECTED} from './types';

/**
 * Set index and item selected in view of the reunifications
 * @param {number} selectedIndex
 * @param {string} selectedItem
 * @returns {Function}
 */
export const setReunificationsSelected = (selectedIndex, selectedItem) => dispatch => {
  dispatch({
    type: SET_REUNIFICATIONS_SELECTED.SET,
    payload: {
      selected: {
        selectedIndex,
        selectedItem,
      },
    },
  })
};