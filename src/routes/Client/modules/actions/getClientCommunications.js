import {CLIENT} from 'action-types';
import axios from 'axios';

/**
 * Request for getDataClient action
 * @returns {{type: string}}
 * @private
 */
const _getClientCommunicationsRequest = () => ({
  type: CLIENT.COMMUNICATIONS.REQUEST,
  payload: {
    communications: [],
  },
});

/**
 * Return success for getDataClient action
 * @returns {{type: string}}
 * @private
 */
const _getClientCommunicationsSuccess = () => ({
  type: CLIENT.COMMUNICATIONS.SUCCESS,
});

/**
 * Return set for getDataClient action
 * @returns {{type: string}}
 * @private
 */
const _getClientCommunicationsSet = ({data}) => ({
  type: CLIENT.COMMUNICATIONS.SET,
  payload: {
    communications: data,
  },
});


/**
 * Return error for getDataClient action
 * @returns {{type: string}}
 * @private
 */
const _getClientCommunicationsError = error => ({
  type: CLIENT.COMMUNICATIONS.FAILURE,
  error,
});

/**
 * Get client communications
 * @param clientId
 * @returns {function(...[*]=)}
 */
export const getClientCommunications = clientId => async dispatch => {
  dispatch(_getClientCommunicationsRequest());
  try {
    const response = await axios({
      url: `/client/comunications/list/${clientId}`,
    });
    dispatch(_getClientCommunicationsSuccess());
    dispatch(_getClientCommunicationsSet(response));
  } catch (error) {
    console.error(error);
    dispatch(_getClientCommunicationsError(error));
  }
};