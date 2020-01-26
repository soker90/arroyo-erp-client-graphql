import {CLIENT} from 'action-types';
import axios from 'axios';

/**
 * Request for getRecoveryByClient action
 * @returns {{type: string}}
 * @private
 */
const _getRecoveryByClientRequest = () => ({
  type: CLIENT.GET_RECOVERY.REQUEST,
  payload: {
    recovery: {},
  },
});

/**
 * Return success for getRecoveryByClient action
 * @returns {Object}
 * @private
 */
const _getRecoveryByClientSuccess = payload => ({
  type: CLIENT.GET_RECOVERY.SUCCESS,
  payload,
});

/**
 * Return success for getRecoveryByClient action
 * @returns {Object}
 * @private
 */
const _getRecoveryByClientOk = () =>
  _getRecoveryByClientSuccess({
    level: 'info',
    message: 'Cliente al corriente de pago.',
  });

/**
 * Return success for getRecoveryByClient action
 * @returns {Object}
 * @private
 */
const _getRecoveryByClientWarning = () =>
  _getRecoveryByClientSuccess({
    level: 'warning',
    message: 'Cliente en situación de impagos.',
  });

/**
 * Return set for getRecoveryByClient action
 * @param {Object} recovery
 * @returns {Object}
 * @private
 */
const _getRecoveryByClientSet = recovery => ({
  type: CLIENT.GET_RECOVERY.SET,
  payload: {
    recovery,
  },
});


/**
 * Return error for getRecoveryByClient action
 * @param {Object} error
 * @returns {Object}
 * @private
 */
const _getRecoveryByClientError = error => ({
  type: CLIENT.GET_RECOVERY.FAILURE,
  error,
});

/**
 * Return payment status
 * @param {string} clientId
 * @param {function} callback
 * @returns {function(...[*]=)}
 */
export const getRecoveryByClient = (clientId, callback) => async dispatch => {
  dispatch(_getRecoveryByClientRequest());
  try {
    const response = await axios({
      url: `/recovery/getRecoveryByClient/${clientId}`,
    });
    if (response.status === 204) {
      dispatch(_getRecoveryByClientOk());
    } else {
      dispatch(_getRecoveryByClientSet(response.data));
      dispatch(_getRecoveryByClientWarning());
    }
  } catch (error) {
    console.error(error);
    dispatch(_getRecoveryByClientError(error));
  }
};