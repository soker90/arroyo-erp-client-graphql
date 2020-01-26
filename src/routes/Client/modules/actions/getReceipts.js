import {CLIENT} from 'action-types';
import axios from 'axios';

/**
 * Request for getReceipts action
 * @returns {{type: string}}
 * @private
 */
const _getgetReceiptsRequest = () => ({
  type: CLIENT.RECEIPTS.REQUEST,
  payload: {
    receipts: [],
  },
});

/**
 * Return success for getReceipts action
 * @returns {{type: string}}
 * @private
 */
const _getgetReceiptsSuccess = () => ({
  type: CLIENT.RECEIPTS.SUCCESS,
});

/**
 * Return set for getReceipts action
 * @returns {{type: string}}
 * @private
 */
const _getgetReceiptsSet = ({data}) => ({
  type: CLIENT.RECEIPTS.SET,
  payload: {
    receipts: data,
  },
});

/**
 * Return error for getReceipts action
 * @returns {{type: string}}
 * @private
 */
const _getgetReceiptsError = error => ({
  type: CLIENT.RECEIPTS.FAILURE,
  error,
});

export const getReceipts = contractId => async dispatch => {
  dispatch(_getgetReceiptsRequest());
  try {
    const response = await axios({url: `/receipt/list/${contractId}`});
    dispatch(_getgetReceiptsSuccess());
    dispatch(_getgetReceiptsSet(response));
  } catch (error) {
    console.error(error);
    dispatch(_getgetReceiptsError(error));
  }
};