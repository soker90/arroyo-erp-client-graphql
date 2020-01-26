import {CLIENT} from 'action-types';
import axios from 'axios';

/**
 * Request for getPrescriber action
 * @returns {{type: string}}
 * @private
 */
const _getPrescriberRequest = () => ({
  type: CLIENT.PRESCRIBER.REQUEST,
  payload: {
    prescriber: {},
  },
});

/**
 * Return success for getPrescriber action
 * @returns {{type: string}}
 * @private
 */
const _getPrescriberSuccess = () => ({
  type: CLIENT.PRESCRIBER.SUCCESS,
});

/**
 * Return set for getPrescriber action
 * @param {Array} prescriber
 * @returns {{type: string}}
 * @private
 */
const _getPrescriberSet = prescriber => ({
  type: CLIENT.PRESCRIBER.SET,
  payload: {
    prescriber,
  },
});


/**
 * Return error for getPrescriber action
 * @param {Object} error
 * @returns {{type: string}}
 * @private
 */
const _getPrescriberError = error => ({
  type: CLIENT.PRESCRIBER.FAILURE,
  error,
});

export const getPrescriber = contractId => async dispatch => {
  dispatch(_getPrescriberRequest());
  try {
    const response = await axios({
      url: `/prescriber/getPrescriberByContractId/${contractId}`,
    });
    dispatch(_getPrescriberSuccess());

    let payload = {};
    if (response?.data) {
      payload = response.data;
    }
    dispatch(_getPrescriberSet(payload));
  } catch (error) {
    console.error(error);
    dispatch(_getPrescriberError(error));
  }
};