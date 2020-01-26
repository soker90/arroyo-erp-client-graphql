import {EMAIL_TEMPLATES} from 'action-types';
import axios from 'axios';

/**
 * Return request action
 * @returns {{type: string}}
 * @private
 */
const _getEmailTemplatesRequest = () => ({
  type: EMAIL_TEMPLATES.REQUEST,
});

/**
 * Return success action
 * @returns {{type: string}}
 * @private
 */
const _getEmailTemplatesSuccess = () => ({
  type: EMAIL_TEMPLATES.SUCCESS,
});

/**
 * Return set action
 * @param data
 * @returns {{payload: {emailTemplates: *}, type: string}}
 * @private
 */
const _getEmailTemplatesSet = ({data}) => ({
  type: EMAIL_TEMPLATES.SET,
  payload: {
    emailTemplates: data,
  },
});

/**
 * Return failure action
 * @param {Object} error
 * @returns {{type: string, error: Object}}
 * @private
 */
const _getEmailTemplatesError = error => ({
  type: EMAIL_TEMPLATES.FAILURE,
  error,
});

// TODO llevar a otro sitio, no me gusta aqui
export const getEmailTemplates = () => async dispatch => {
  dispatch(_getEmailTemplatesRequest());

  try {
    const response = await axios('/client/emailTemplate');

    dispatch(_getEmailTemplatesSuccess());
    dispatch(_getEmailTemplatesSet(response));
  } catch (error) {
    console.log(error);
    dispatch(_getEmailTemplatesError(error));
  }
};