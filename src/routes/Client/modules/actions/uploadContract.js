import {CLIENT} from 'action-types';
import axios from 'axios';
import {getContract} from 'routes/Client/modules/actions';

/**
 * Request for uploadContract action
 * @returns {{type: string}}
 * @private
 */
const _uploadContractRequest = () => ({
  type: CLIENT.UPDATE_CONTRACT.REQUEST,
});

/**
 * Return success for uploadContract action
 * @returns {{type: string}}
 * @private
 */
const _uploadContractSuccess = () => ({
  type: CLIENT.UPDATE_CONTRACT.SUCCESS,
  payload: {
    level: 'success',
    message: 'El contrato se ha subido correctamente.',
  },
});

/**
 * Return error for uploadContract action
 * @returns {{type: string}}
 * @private
 */
const _uploadContractError = error => ({
  type: CLIENT.UPDATE_CONTRACT.FAILURE,
  error,
});

/**
 * Upload contract
 * @param {String} contractId
 * @param file
 * @returns {function(...[*]=)}
 */
export const uploadContract = (contractId, file) => async dispatch => {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  const headers = {'Content-Type': 'multipart/form-data'};

  dispatch(_uploadContractRequest());
  try {
    await axios({
      url: `/contract/docs/${contractId}`,
      method: 'PUT',
      data: formData,
      headers,
    });
    dispatch(getContract(contractId));
    dispatch(_uploadContractSuccess());
  } catch (error) {
    console.error(error);
    dispatch(_uploadContractError(error));
  }
};