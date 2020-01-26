import {CLIENT} from 'action-types';
import axios from 'axios';

/**
 * Request for getContract action
 * @returns {{type: string}}
 * @private
 */
const _getContractRequest = () => ({
  type: CLIENT.CONTRACT.REQUEST,
  payload: {
    contract: {},
  },
});

/**
 * Return success for getContract action
 * @returns {{type: string}}
 * @private
 */
const _getContractSuccess = () => ({
  type: CLIENT.CONTRACT.SUCCESS,
});

/**
 * Return set for getContract action
 * @returns {{type: string}}
 * @private
 */
const _getContractSet = ({data}) => ({
  type: CLIENT.CONTRACT.SET,
  payload: {
    contract: data,
  },
});

/**
 * Return error for getContract action
 * @returns {{type: string}}
 * @private
 */
const _getContractError = error => ({
  type: CLIENT.CONTRACT.FAILURE,
  error,
});

/**
 * Get data of contract
 * @param contractId
 * @returns {function(...[*]=)}
 */
export const getContract = contractId => async dispatch => {
  dispatch(_getContractRequest());
  try {
    const response = await axios({url: `/contract/info/${contractId}`});
    dispatch(_getContractSuccess());
    dispatch(_getContractSet(response));
  } catch (error) {
    console.error(error);
    dispatch(_getContractError(error));
  }
};