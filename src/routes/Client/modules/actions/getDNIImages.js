import {CLIENT} from 'action-types';
import axios from 'axios';

/**
 * Request for getDNIImages action
 * @returns {{type: string}}
 * @private
 */
const _getDNIImagesRequest = () => ({
  type: CLIENT.GET_IMAGES.REQUEST,
  payload: {
    dniImages: {
      front: null,
      back: null,
    },
  },
});

/**
 * Return success for getDNIImages action
 * @returns {{type: string}}
 * @private
 */
const _getDNIImagesSuccess = () => ({
  type: CLIENT.GET_IMAGES.SUCCESS,
});

/**
 * Return set for getDNIImages action
 * @returns {{type: string}}
 * @private
 */
const _getDNIImagesSet = ({data: {front, back}}) => ({
  type: CLIENT.GET_IMAGES.SET,
  payload: {
    dniImages: {
      front: front ? `data:image/jpeg;base64,${front}` : null,
      back: back ? `data:image/jpeg;base64,${back}` : null,
    },
  },
});

/**
 * Return error for getDNIImages action
 * @returns {{type: string}}
 * @private
 */
const _getDNIImagesError = error => ({
  type: CLIENT.GET_IMAGES.FAILURE,
  error,
});


/**
 * Get DNI Images of the titular
 * @param {String} clientId
 * @returns {function(...[*]=)}
 */
export const getDNIImages = clientId => async dispatch => {
  if (!clientId) {
    return;
  }

  dispatch(_getDNIImagesRequest());
  try {
    const response = await axios({url: `/client/dni/${clientId}`});
    dispatch(_getDNIImagesSuccess());
    dispatch(_getDNIImagesSet(response));
  } catch (error) {
    console.error(error);
    dispatch(_getDNIImagesError(error));
  }
};