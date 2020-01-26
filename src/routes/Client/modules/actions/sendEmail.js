import {CLIENT} from 'action-types';
import axios from 'axios';
import {getClientCommunications} from 'routes/Client/modules/actions';

/**
 * Request for sendEmail action
 * @returns {{type: string}}
 * @private
 */
const _saveRecoveryDataRequest = () => ({
  type: CLIENT.SEND_EMAIL_COMMUNICATION.REQUEST,
});

/**
 * Return success for sendEmail action
 * @returns {{type: string}}
 * @private
 */
const _saveRecoveryDataSuccess = clientId => ({
  type: CLIENT.SEND_EMAIL_COMMUNICATION.SUCCESS,
  payload: {
    level: 'success',
    message: `Email enviado a ${clientId}`,
  },
});

/**
 * Return error for sendEmail action
 * @param {Object} error
 * @returns {{type: string}}
 * @private
 */
const _saveRecoveryDataError = error => ({
  type: CLIENT.SEND_EMAIL_COMMUNICATION.FAILURE,
  error,
});

export const sendEmail = ({summary, text}, callback) => async (dispatch, getState) => {
  const {clientId} = getState().client.client;
  const data = {
    summary,
    text,
    clientId,
    directionType: 'O',
    comunicationTypeId: 2,
    dateComunication: Date.now(),
    answer: 1,
  };

  dispatch(_saveRecoveryDataRequest());
  try {
    await axios.put('/client/communication/sendEmail', data);

    dispatch(getClientCommunications(clientId));
    dispatch(_saveRecoveryDataSuccess(clientId));
    callback();
  } catch (error) {
    console.error(error);
    dispatch(_saveRecoveryDataError(error));
  }
};