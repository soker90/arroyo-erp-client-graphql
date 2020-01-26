import {CLIENT} from 'action-types';
import axios from 'axios';
import {getCoDniImages, getDNIImages} from 'routes/Client/modules/actions';


/**
 * Request for uploadImage action
 * @returns {{type: string}}
 * @private
 */
const _uploadImageRequest = () => ({
  type: CLIENT.UPDATE_IMAGES.REQUEST,
});

/**
 * Return success for uploadImage action
 * @returns {{type: string}}
 * @private
 */
const _uploadImageSuccess = () => ({
  type: CLIENT.GET_IMAGES.SUCCESS,
});

/**
 * Return error for uploadImage action
 * @param error
 * @returns {{type: string, error: _uploadImageError.props}}
 * @private
 */
const _uploadImageError = error => ({
  type: CLIENT.GET_IMAGES.FAILURE,
  error,
});

export const uploadImage = (type, file) => async (dispatch, getState) => {
  const contractId = getState().client?.contracts?.[0]?.contractId;
  const clientId = getState().client?.client?.clientId;
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  const headers = {'Content-Type': 'multipart/form-data'};

  dispatch(_uploadImageRequest());
  try {
    await axios({
      url: `/contract/upload_file/${contractId}/${type}`,
      method: 'PUT',
      data: formData,
      headers,
    });
    dispatch(_uploadImageSuccess());
    dispatch(getDNIImages(clientId));
    dispatch(getCoDniImages(clientId));
  } catch (error) {
    console.error(error);
    dispatch(_uploadImageError(error));
  }
};