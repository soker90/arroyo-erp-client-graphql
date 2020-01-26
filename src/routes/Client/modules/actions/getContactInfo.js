import {CLIENT} from 'action-types';
import axios from 'axios';

/**
 * Request for getContactInfo action
 * @returns {{type: string}}
 * @private
 */
const _getContactInfoRequest = () => ({
  type: CLIENT.GET_CONTACT_INFO.REQUEST,
  payload: {
    contactInfo: [],
  },
});

/**
 * Return success for getContactInfo action
 * @returns {{type: string}}
 * @private
 */
const _getContactInfoSuccess = () => ({
  type: CLIENT.GET_CONTACT_INFO.SUCCESS,

});

/**
 * Return set for getContactInfo action
 * @param {Array} contactInfo
 * @returns {{type: string}}
 * @private
 */
const _getContactInfoSet = contactInfo => ({
  type: CLIENT.GET_CONTACT_INFO.SET,
  payload: {
    contactInfo,
  },
});


/**
 * Return error for getContactInfo action
 * @param {Object} error
 * @returns {{type: string}}
 * @private
 */
const _getContactInfoError = error => ({
  type: CLIENT.GET_CONTACT_INFO.FAILURE,
  payload: {
    contactInfo: [],
  },
  error,
});

export const getContactInfo = clientId => async dispatch => {
  dispatch(_getContactInfoRequest());

  try {
    const URL = `/client/clientContactInfo/${clientId}`;
    const response = await axios(URL);

    const orderedList = response.data.sort(
      (a, b) => a.clientContactInfoId - b.clientContactInfoId,
    );

    dispatch(_getContactInfoSuccess());
    dispatch(_getContactInfoSet(orderedList));
  } catch (error) {
    console.error(error);
    dispatch(_getContactInfoError(error));
  }
};