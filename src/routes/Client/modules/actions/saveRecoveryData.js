import {CLIENT} from 'action-types';
import axios from 'axios';
import {getRecoveryByClient} from 'routes/Client/modules/actions';

/**
 * Request for getPrescriber action
 * @returns {{type: string}}
 * @private
 */
const _saveRecoveryDataRequest = () => ({
  type: CLIENT.SAVE_RECOVERY.REQUEST,
});

/**
 * Return success for getPrescriber action
 * @returns {{type: string}}
 * @private
 */
const _saveRecoveryDataSuccess = () => ({
  type: CLIENT.SAVE_RECOVERY.SUCCESS,
  payload: {
    level: 'success',
    message: 'Se han actualizado los datos.',
  },
});

/**
 * Return error for getPrescriber action
 * @param {Object} error
 * @returns {{type: string}}
 * @private
 */
const _saveRecoveryDataError = error => ({
  type: CLIENT.SAVE_RECOVERY.FAILURE,
  error,
});

export const saveRecoveryData = (data, callback) => async (
  dispatch,
  getState,
) => {
  dispatch(_saveRecoveryDataRequest());
  const {clientId} = getState().client.client;

  try {
    await axios({url: '/recovery/saveRecovery', method: 'POST', data: {...data, clientId}});
    dispatch(_saveRecoveryDataSuccess());
    dispatch(getRecoveryByClient(clientId));
    // eslint-disable-next-line no-unused-expressions
    callback?.();

  } catch (error) {
    console.error(error);
    dispatch(_saveRecoveryDataError(error));
  }
};