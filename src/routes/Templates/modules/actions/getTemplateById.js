import {GET_TEMPLATE_BY_ID} from '../types';
import axios from 'axios';

/**
 * Return actions for init request model
 * @returns {{payload: {loading: boolean}, type: string}}
 */
const getTemplateByIdRequest = () => ({
  type: GET_TEMPLATE_BY_ID.REQUEST,
  payload: {
    loading: true,
    template: {},
  },
});

/**
 * Return actions for success request model
 *
 * @param {Object} data
 * @returns {{payload: {template: Object, loading: boolean}, type: string}}
 */
const getTemplateByIdSuccess = ({data}) => ({
  type: GET_TEMPLATE_BY_ID.SUCCESS,
  payload: {
    loading: false,
    template: data,
  },
});

/**
 * Return action with error cause
 * @param {Object}  error
 * @returns {{payload: {loading: boolean, error: Object}, type: string}}
 */
const getTemplateByIdError = error => ({
  type: GET_TEMPLATE_BY_ID.FAILURE,
  payload: {
    loading: false,
    error,
  },
});

/**
 * Get email template by id
 * @param {number} id
 * @returns {Function}
 */
export const getTemplateById = id =>
  async dispatch => {
    dispatch(getTemplateByIdRequest());
    try {
      const URL = `/email/templates/${id}`;
      const response = await axios(URL);
      dispatch(getTemplateByIdSuccess(response))
    } catch (error) {
      console.error(error);
      dispatch(getTemplateByIdError(error));
    }
  };