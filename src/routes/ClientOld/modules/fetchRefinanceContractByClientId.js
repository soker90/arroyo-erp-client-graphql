import {FETCH_REFINANCE_CONTRACT_BY_CLIENT_ID} from './types';
import axios from 'axios';

const _fetchRefinanceContractByClientIdRequest = () => ({
  type: FETCH_REFINANCE_CONTRACT_BY_CLIENT_ID.REQUEST,
});

const _fetchRefinanceContractByClientIdSuccess = data => ({
  type: FETCH_REFINANCE_CONTRACT_BY_CLIENT_ID.SUCCESS,
  payload: data.length > 0,
});

const _fetchRefinanceContractByClientIdError = error => ({
  type: FETCH_REFINANCE_CONTRACT_BY_CLIENT_ID.FAILURE,
  error,
});

/**
 * Fetch if have refinance contract
 * @param {string} clientId
 * @public
 */
export const fetchRefinanceContractByClientId = clientId =>
  async dispatch => {
    dispatch(_fetchRefinanceContractByClientIdRequest());
    try {
      const response = await axios(`recovery/getRefinanceContract/${clientId}`);

      dispatch(_fetchRefinanceContractByClientIdSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(_fetchRefinanceContractByClientIdError(error));
    }
  };
