import {CLIENT} from 'action-types';
import axios from 'axios';

/**
 * Request for getClientContracts action
 * @returns {{type: string}}
 * @private
 */
const _getClientContractsRequest = () => ({
  type: CLIENT.CONTRACTS.REQUEST,
});

/**
 * Return success for getClientContracts action
 * @returns {{type: string}}
 * @private
 */
const _getClientContractsSuccess = () => ({
  type: CLIENT.CONTRACTS.SUCCESS,
});

/**
 * Return set for getClientContracts action
 * @returns {{type: string}}
 * @private
 */
const _getClientContractsSet = contracts => ({
  type: CLIENT.CONTRACTS.SET,
  payload: {
    contracts,
  },
});


/**
 * Return error for getClientContracts action
 * @returns {{type: string}}
 * @private
 */
const _getClientContractsError = error => ({
  type: CLIENT.CONTRACTS.FAILURE,
  error,
});

/**
 * Set refinanced in redux
 * @param refinanced
 * @returns {{payload: {refinanced: _setRefinanced.props}, type: string}}
 * @private
 */
const _setRefinanced = refinanced => ({
  type: CLIENT.REFINANCED.SET,
  payload: {refinanced},
});


export const getClientContracts = clientId => async dispatch => {
  dispatch(_getClientContractsRequest());
  try {
    const response = await axios({url: `/contract/list/${clientId}`});
    dispatch(_getClientContractsSuccess());
    dispatch(_getClientContractsSet(response.data));

    if (response?.data) {
      response.data.forEach(contract => {
        if (contract.opsType !== null) {
          dispatch(_setRefinanced(contract.opsType));
        }
      });
    }
  } catch (error) {
    console.error(error);
    dispatch(_getClientContractsError(error));
  }
};