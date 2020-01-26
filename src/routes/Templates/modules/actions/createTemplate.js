import {CREATE_TEMPLATE} from '../types';
import axios from 'axios';
import {getTemplates} from './getTemplates';

/**
 * Return actions for init request model
 * @returns {{type: string}}
 */
const createTemplateRequest = () => ({
  type: CREATE_TEMPLATE.REQUEST,
});

/**
 * Return actions for success request model
 *
 * @returns {{type: string}}
 */
const createTemplateSuccess = () => ({
  type: CREATE_TEMPLATE.SUCCESS,
  payload: {
    level: 'success',
    title: 'PLANTILLA CREADA',
    message: `Se ha creado la plantilla correctamente.`,
  },
});

/**
 * Return action with error cause
 * @param {Object}  error
 * @returns {{payload: {error: *}, type: *}}
 */
const createTemplateError = error => ({
  type: CREATE_TEMPLATE.FAILURE,
  payload: {
    error,
  },
});

/**
 * Create template
 * @param {Object} body
 * @param {function} callback
 * @returns {Function}
 */
export const createTemplate = (body, callback) =>
  async dispatch => {
    dispatch(createTemplateRequest());
    try {
      const URL = `/email/templates/`;
      await axios.post(URL, body);
      dispatch(createTemplateSuccess());
      dispatch(getTemplates());
      callback();
    } catch (error) {
      console.error(error);
      dispatch(createTemplateError(error));
    }
  };