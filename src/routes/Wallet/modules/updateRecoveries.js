import {CLIENT} from 'src/action-types';
import axios from 'axios';

/**
 * Request for updateRecoveries action
 * @returns {{type: string}}
 * @private
 */
const _updateRecoveriesRequest = () => ({
  type: CLIENT.UPDATE_RECOVERIES.REQUEST,
});

/**
 * Return success for updateRecoveries action
 * @returns {{payload: {level: string, message: string}, type: string}}
 * @private
 */
const _updateRecoveriesSuccess = () => ({
  type: CLIENT.UPDATE_RECOVERIES.SUCCESS,
  payload: {
    level: 'success',
    message: 'Se ha actualizado la lista de recobros.',
  },
});

/**
 * Return error for updateRecoveries action
 * @returns {{type: string}}
 * @private
 */
const _updateRecoveriesError = error => ({
  type: CLIENT.UPDATE_RECOVERIES.FAILURE,
  error,
});

/**
 * Refresh recoveries list
 * @returns {function(...[*]=)}
 */
export const updateRecoveries = () => async dispatch => {
  dispatch(_updateRecoveriesRequest());
  try {
    await axios.post('recovery/updateRecoveries');

    dispatch(_updateRecoveriesSuccess());
  } catch (error) {
    console.log(error);
    dispatch(_updateRecoveriesError(error));
  }
};