import {UPDATE_TEMPLATE} from '../types';
import axios from 'axios';
import {getTemplates} from './getTemplates';

/**
 * Return actions for init request model
 * @returns {{type: string}}
 */
const updateTemplateRequest = () => ({
  type: UPDATE_TEMPLATE.REQUEST,
});

/**
 * Return actions for success request model
 *
 * @returns {{type: string}}
 */
const updateTemplateSuccess = () => ({
  type: UPDATE_TEMPLATE.SUCCESS,
  payload: {
    level: 'success',
    title: 'PLANTILLA ACTUALIZADA',
    message: `Se ha actualizado la plantilla correctamente.`,
  },
});

/**
 * Return action with error cause
 * @param {Object}  error
 * @returns {{payload: {error: *}, type: *}}
 */
const updateTemplateError = error => ({
  type: UPDATE_TEMPLATE.FAILURE,
  payload: {
    error,
  },
});

/**
 * Update template
 * @param {number} id
 * @param {Object} body
 * @returns {Function}
 */
export const updateTemplate = (id, body) =>
  async dispatch => {
    dispatch(updateTemplateRequest());
    try {
      const URL = `/email/templates/${id}`;
      await axios.put(URL, body);
      dispatch(updateTemplateSuccess());
      dispatch(getTemplates());
    } catch (error) {
      console.error(error);
      dispatch(updateTemplateError(error));
    }
  };