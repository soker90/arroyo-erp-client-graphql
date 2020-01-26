import {GET_RECOVERIES_UNREAD} from './types';
import axios from 'axios';

/**
 * Request for getRecoveriesUnread
 * @returns {{type: string}}
 * @private
 */
const _getRecoveriesUnreadRequest = () => ({
  type: GET_RECOVERIES_UNREAD.REQUEST,
  payload: {
    unread: [],
  },
});

/**
 * Success for getRecoveriesUnread
 * @returns {{type: string}}
 * @private
 */
const _getRecoveriesUnreadSuccess = unread => ({
  type: GET_RECOVERIES_UNREAD.SUCCESS,
  payload: {
    unread,
  },
});

/**
 * Request for getRecoveriesUnread
 * @returns {{type: string}}
 * @private
 */
const _getRecoveriesUnreadError = error => ({
  type: GET_RECOVERIES_UNREAD.FAILURE,
  error,
});

export const getRecoveriesUnread = () => async dispatch => {
  dispatch(_getRecoveriesUnreadRequest());
  try {
    const response = await axios(`/recovery/getRecoveries/today`);

    dispatch(_getRecoveriesUnreadSuccess(response.data));
  } catch (error) {
    console.error(error);
    dispatch(_getRecoveriesUnreadError(error));
  }
};