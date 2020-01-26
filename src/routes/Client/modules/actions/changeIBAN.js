import {CLIENT} from 'action-types';
import axios from 'axios';
import {getContract} from '../../../Client/modules/actions';
import IBAN from 'iban';

/**
 * Request for changeIBAN action
 * @returns {{type: string}}
 * @private
 */
const _changeIBANRequest = () => ({
  type: CLIENT.UPDATE_IBAN.REQUEST,
});

/**
 * Return success for changeIBAN action
 * @returns {{type: string}}
 * @private
 */
const _changeIBANSuccess = () => ({
  type: CLIENT.UPDATE_IBAN.SUCCESS,
  payload: {
    level: 'success',
    message: 'IBAN actualizado.',
  },
});

/**
 * Return error for changeIBAN action
 * @returns {{type: string}}
 * @private
 */
const _changeIBANError = error => ({
  type: CLIENT.UPDATE_IBAN.FAILURE,
  error,
});

/**
 * Change iban for contract
 * @param {function} callback
 * @param {String} iban
 * @returns {function(...[*]=)}
 */
export const changeIBAN = (iban, callback) => async (dispatch, getState) => {
  const contractId = getState().client.contract.contractId;
  const body = {chargeAccount: iban};
  dispatch(_changeIBANRequest());
  try {
    if (!IBAN.isValid(iban)) {
      throw new Error('El IBAN no es válido');
    }
    await axios({
      url: `/contract/changeAccount/${contractId}`,
      method: 'PUT',
      data: body,
    });
    dispatch(getContract(contractId));
    dispatch(_changeIBANSuccess());
    callback();
  } catch (error) {
    console.error(error);
    dispatch(_changeIBANError(error));
  }
};