import {CLIENT} from 'action-types';
import axios from 'axios';
import {getClientCommunications} from 'routes/Client/modules/actions';

/**
 * Request for setCommunication action
 * @returns {{type: string}}
 * @private
 */
const _setCommunicationRequest = () => ({
  type: CLIENT.SEND_COMMUNICATION.REQUEST,
});

/**
 * Return success for setCommunication action
 * @returns {{type: string}}
 * @private
 */
const _setCommunicationSuccess = () => ({
  type: CLIENT.SEND_COMMUNICATION.SUCCESS,
  payload: {
    level: 'success',
    message: 'Se han actualizado las comunicaciónes con el cliente.',
  },
});

/**
 * Return error for setCommunication action
 * @returns {{type: string}}
 * @private
 */
const _setCommunicationError = error => ({
  type: CLIENT.SEND_COMMUNICATION.FAILURE,
  error,
});

export const setCommunication = (data, callback) => async dispatch => {
  const {clientId} = data;

  dispatch(_setCommunicationRequest());
  try {
    await axios.post(`/client/comunications/${clientId}`, data);

    dispatch(_setCommunicationSuccess());
    dispatch(getClientCommunications(clientId));
    callback();
  } catch (error) {
    console.error(error);
    dispatch(_setCommunicationError(error));
  }
};