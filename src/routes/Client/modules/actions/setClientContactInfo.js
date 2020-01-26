import {CLIENT} from 'action-types';
import axios from 'axios';
import {getContactInfo} from './getContactInfo';

/**
 * Request for setClientContactInfo action
 * @returns {{type: string}}
 * @private
 */
const _setClientContactInfoRequest = () => ({
  type: CLIENT.SET_CONTACT_INFO.REQUEST,
});

/**
 * Return success for setClientContactInfo action
 * @returns {{payload: {level: string, message: string}, type: string}}
 * @private
 */
const _setClientContactInfoSuccess = () => ({
  type: CLIENT.SET_CONTACT_INFO.SUCCESS,
  payload: {
    level: 'success',
    message: 'Se ha actualizado la información de contacto.',
  },
});

/**
 * Return error for setClientContactInfo action
 * @returns {{type: string}}
 * @private
 */
const _setClientContactInfoError = error => ({
  type: CLIENT.SET_CONTACT_INFO.FAILURE,
  error,
});

/**
 * Set data for other contact of the client
 * @param {Object} data
 * @param {function} callback
 * @returns {function(...[*]=)}
 */
export const setClientContactInfo = (data, callback) => async dispatch => {
  dispatch(_setClientContactInfoRequest());

  try {
    const URL = '/client/updateClientContactInfo';
    await axios.put(URL, data);

    dispatch(getContactInfo(data.clientId));
    dispatch(_setClientContactInfoSuccess());
    callback();
  } catch (error) {
    console.error(error);
    dispatch(_setClientContactInfoError());
  }
};