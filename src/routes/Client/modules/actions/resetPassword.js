import {CLIENT} from 'action-types';
import axios from 'axios';

/**
 * Request for getDataClient action
 * @returns {{type: string}}
 * @private
 */
const _resetPasswordRequest = () => ({
  type: CLIENT.SEND_SMS_COMMUNICATION.REQUEST,
});

/**
 * Return success for getDataClient action
 * @returns {{type: string}}
 * @private
 */
const _resetPasswordSuccess = clientId => ({
  type: CLIENT.SEND_SMS_COMMUNICATION.SUCCESS,
  payload: {
    level: 'success',
    message: `Contraseña enviada al cliente ${clientId}`,
  },
});

/**
 * Return error for getDataClient action
 * @returns {{type: string}}
 * @private
 */
const _resetPasswordError = error => ({
  type: CLIENT.SEND_SMS_COMMUNICATION.FAILURE,
  error,
});

/**
 * Send email for recovery password to the client
 * @param callback
 * @returns {function(...[*]=)}
 */
export const resetPassword = callback => async (dispatch, getState) => {
  const {clientId} = getState().client.client;
  dispatch(_resetPasswordRequest());
  try {
    await axios.post(
      `/client/communication/sendClientAccountActivationToken/${clientId}`,
    );

    dispatch(_resetPasswordSuccess(clientId));
    // eslint-disable-next-line no-unused-expressions
    callback?.();
  } catch (error) {
    console.error(error);

    dispatch(_resetPasswordError(error));
  }
};