import axios from 'axios';
import {GET_PAYMENTS} from '../types';
import {objectData} from 'utils';

/**
 * Return actions for init request model
 * @returns {{payload: {loading: boolean}, type: string}}
 */
const getPaymentsRequest = () => ({
  type: GET_PAYMENTS.REQUEST,
  payload: {
    loading: true,
  },
});

/**
 * Return actions for success request model
 *
 * @param {Array} data
 * @returns {{payload: {payments: *, loading: boolean}, type: *}}
 */
const getPaymentsSuccess = ({data}) => ({
  type: GET_PAYMENTS.SUCCESS,
  payload: {
    loading: false,
    payments: data,
  },
});

/**
 * Return action with error cause
 * @param {Object}  error
 * @returns {{payload: {loading: boolean, error: Object}, type: string}}
 */
const getPaymentsError = error => ({
  type: GET_PAYMENTS.FAILURE,
  payload: {
    loading: false,
    error,
  },
});

/**
 * Format for the query params
 * @param {Object} params
 * @returns {string}
 */
const formatFilterQueryParams = params =>
  params ? `?${objectData(params)}` : '';

/**
 * Get the history of payment application
 * @returns {Function}
 */
export const getPayments = (filter = null) =>
  async dispatch => {
    dispatch(getPaymentsRequest());
    try {
      const URL = `/income/applied${formatFilterQueryParams(filter)}`;
      const response = await axios(URL);
      dispatch(getPaymentsSuccess(response))
    } catch (error) {
      console.error(error);
      dispatch(getPaymentsError(error));
    }
  };