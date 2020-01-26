import {GET_TEMPLATES} from '../types';
import axios from 'axios';
import {objectData} from 'utils';

/**
 * Return actions for init request model
 * @returns {{payload: {loading: boolean}, type: string}}
 */
const getTemplatesRequest = () => ({
  type: GET_TEMPLATES.REQUEST,
  payload: {
    loading: true,
  },
});

/**
 * Return actions for success request model
 *
 * @param {Array} data
 * @returns {{payload: {templateList: array, loading: boolean}, type: string}}
 */
const getTemplatesSuccess = ({data}) => ({
  type: GET_TEMPLATES.SUCCESS,
  payload: {
    loading: false,
    templateList: modifyDataModel(data),
  },
});

/**
 * Return action with error cause
 * @param {Object}  error
 * @returns {{payload: {loading: boolean, error: Object}, type: string}}
 */
const getTemplatesError = error => ({
  type: GET_TEMPLATES.FAILURE,
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
  params ? `filter?${objectData(params)}` : '';

/**
 * Modify data modal
 * @param model
 * @returns {Array}
 */
const modifyDataModel = model =>
  model.map(item => (!item.modDate) ?
    {
      ...item,
      modDate: item.creationDate,
      modUser: item.creationUser,
    } :
    item,
  );

/**
 * Get the email templates
 * @returns {Function}
 */
export const getTemplates = (filter = null) =>
  async dispatch => {
    dispatch(getTemplatesRequest());
    try {
      const URL = `/email/templates/${formatFilterQueryParams(filter)}`;
      const response = await axios(URL);
      dispatch(getTemplatesSuccess(response))
    } catch (error) {
      console.error(error);
      dispatch(getTemplatesError(error));
    }
  };