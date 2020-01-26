import {CLIENT} from 'action-types';
import axios from 'axios';
import {getClientData} from './getClientData';

/**
 * Request for sendToJudicial action
 * @returns {{type: string}}
 * @private
 */
const _saveClientDataRequest = () => ({
  type: CLIENT.UPDATE.REQUEST,
});

/**
 * Return success for getDataClient action
 * @returns {{type: string}}
 * @private
 */
const _saveClientDataSuccess = () => ({
  type: CLIENT.UPDATE.SUCCESS,
  payload: {
    level: 'success',
    message: 'Se han actualizado los datos del cliente.',
  },
});

/**
 * Return error for getDataClient action
 * @returns {{type: string}}
 * @private
 */
const _saveClientDataError = error => ({
  type: CLIENT.UPDATE.FAILURE,
  error,
});

/**
 * Save data client
 * @param {Object} data
 * @param {function} callback
 * @returns {function(...[*]=)}
 */
export const saveClientData = (data, callback) => async (
  dispatch,
  getState,
) => {
  const clientId = getState().client?.client?.clientId;
  const body = {...data, clientId};
  dispatch(_saveClientDataRequest());
  try {
    await axios({url: '/client/update', method: 'PUT', data: body});
    dispatch(getClientData(clientId));
    dispatch(_saveClientDataSuccess());

    if (callback) {
      callback();
    }
  } catch (error) {
    console.error(error);
    dispatch(_saveClientDataError(error));
  }
};