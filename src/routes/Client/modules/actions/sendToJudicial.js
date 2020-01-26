import {CLIENT} from 'action-types';
import axios from 'axios';

/**
 * Request for sendToJudicial action
 * @returns {{type: string}}
 * @private
 */
const _sendToJudicialRequest = () => ({
  type: CLIENT.SEND_TO_JUDICIAL.REQUEST,
});

/**
 * Return success for sendToJudicial action
 * @returns {{type: string}}
 * @private
 */
const _sendToJudicialSuccess = () => ({
  type: CLIENT.SEND_TO_JUDICIAL.SUCCESS,
  payload: {
    level: 'success',
    message: 'Notifiación enviada al abogado',
  },
});

/**
 * Return error for sendToJudicial action
 * @returns {{type: string}}
 * @private
 */
const _sendToJudicialError = error => ({
  type: CLIENT.SEND_TO_JUDICIAL.FAILURE,
  error,
});

/**
 * Send to judicial
 * @param {function} callback
 * @returns {function(...[*]=)}
 */

export const sendToJudicial = callback => async (dispatch, getState) => {
  const {clientId} = getState().client.client;
  dispatch(_sendToJudicialRequest());

  try {
    const URL = `/comunication/sendMailWithExpDebt/${clientId}`;
    await axios.post(URL);

    dispatch(_sendToJudicialSuccess());
    callback();
  } catch (error) {
    console.error(error);
    dispatch(_sendToJudicialError(error));
  }
};