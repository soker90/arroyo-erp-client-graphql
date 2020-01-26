import {CLIENT} from 'action-types';
import axios from 'axios';

/**
 * Request for getCoDniImages action
 * @returns {{type: string}}
 * @private
 */
const _getCoDniImagesRequest = () => ({
  type: CLIENT.GET_CO_IMAGES.REQUEST,
  payload: {
    dniImages: {
      cofront: null,
      coback: null,
    },
  },
});

/**
 * Return success for getCoDniImages action
 * @returns {{type: string}}
 * @private
 */
const _getCoDniImagesSuccess = () => ({
  type: CLIENT.GET_CO_IMAGES.SUCCESS,
});

/**
 * Return set for getCoDniImages action
 * @returns {{type: string}}
 * @private
 */
const _getCoDniImagesSet = ({data: {cofront, coback}}) => ({
  type: CLIENT.GET_CO_IMAGES.SET,
  payload: {
    dniImages: {
      cofront: cofront ? `data:image/jpeg;base64,${cofront}` : null,
      coback: coback ? `data:image/jpeg;base64,${coback}` : null,
    },
  },
});

/**
 * Return error for getCoDniImages action
 * @returns {{type: string}}
 * @private
 */
const _getCoDniImagesError = error => ({
  type: CLIENT.GET_CO_IMAGES.FAILURE,
  error,
});


/**
 * Get DNI Images of the cotitular
 * @param {String} clientId
 * @returns {function(...[*]=)}
 */
export const getCoDniImages = clientId => async dispatch => {
  if (!clientId) {
    return;
  }

  dispatch(_getCoDniImagesRequest());
  try {
    const response = await axios({url: `/client/cotitularDni/${clientId}`});
    dispatch(_getCoDniImagesSuccess());
    dispatch(_getCoDniImagesSet(response));
  } catch (error) {
    console.error(error);
    dispatch(_getCoDniImagesError(error));
  }
};
