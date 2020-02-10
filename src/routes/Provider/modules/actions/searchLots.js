import {SEARCH_LOTS} from 'action-types';
import convertParams from 'utils/object-to-params';
import axios from 'axios';

/**
 * Return actions for init request model
 * @returns {{type: string}}
 */
const _searchLotsRequest = () => ({
  type: SEARCH_LOTS.REQUEST,
});

/**
 * Return actions for success request model
 *
 * @returns {{type: string}}
 */
const _searchLotsSuccess = () => ({
  type: SEARCH_LOTS.SUCCESS,
});

/**
 * Set in redux data
 * @param {Object} data
 * @returns {{payload: {lots: *}, type: string}}
 * @private
 */
const _searchLotsSet = ({data}) => ({
  type: SEARCH_LOTS.SET,
  payload: {
    lots: data,
  },
});

/**
 * Return action with error cause
 * @param {Object}  error
 * @returns {{payload: {error: *}, type: *}}
 */
const _searchLotsError = error => ({
  type: SEARCH_LOTS.FAILURE,
  payload: {
    error,
  },
});

/**
 * Search all lots with filters
 * @param data
 * @returns {function(...[*]=)}
 */
export const getProviderData = id => async dispatch => {
  dispatch(_searchLotsRequest());

  try {
    const URL = `/lot/filter?${convertParams(data)}`;
    const response = await axios(URL);

    dispatch(_searchLotsSuccess());
    dispatch(_searchLotsSet(response));
  } catch (error) {
    console.error(error);
    dispatch(_searchLotsError(error));
  }
};