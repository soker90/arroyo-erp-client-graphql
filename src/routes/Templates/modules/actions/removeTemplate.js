import {REMOVE_TEMPLATE} from '../types';
import axios from 'axios';
import {getTemplates} from './getTemplates';

/**
 * Return actions for init request model
 * @returns {{payload: {loading: boolean}, type: string}}
 */
const removeTemplateRequest = () => ({
  type: REMOVE_TEMPLATE.REQUEST,
  payload: {
    loading: true,
  },
});

/**
 * Return actions for success request model
 *
 * @returns {{payload: { loading: boolean}, type: string}}
 */
const removeTemplateSuccess = () => ({
  type: REMOVE_TEMPLATE.SUCCESS,
  payload: {
    loading: false,
    level: 'success',
    title: 'PLANTILLA BORRADA',
    message: `Se ha eliminado la plantilla correctamente.`,
  },
});

/**
 * Return action with error cause
 * @param {Object}  error
 * @returns {{payload: {loading: boolean, error: Object}, type: string}}
 */
const removeTemplateError = error => ({
  type: REMOVE_TEMPLATE.FAILURE,
  payload: {
    loading: false,
    error,
  },
});

/**
 * Get email template by id
 * @param {number} id
 * @param {function} callback
 * @returns {Function}
 */
export const removeTemplate = (id, callback) =>
  async dispatch => {
    dispatch(removeTemplateRequest());
    try {
      const URL = `/email/templates/delete/${id}`;
      await axios.put(URL);
      dispatch(removeTemplateSuccess());
      dispatch(getTemplates());
      callback();
    } catch (error) {
      console.error(error);
      dispatch(removeTemplateError(error));
    }
  };