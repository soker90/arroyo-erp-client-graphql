import axios from 'axios';
import {showModal} from 'reducers/modal';

import {GET_RECEIPT, UPDATE_RECEIPT} from 'action-types';

export const getReceipt = receiptId => async dispatch => {
  dispatch({type: GET_RECEIPT.REQUEST});
  try {
    const URL = `/receipt/history/${receiptId}`;
    const response = await axios(URL);

    dispatch({type: GET_RECEIPT.SUCCESS});
    dispatch({type: GET_RECEIPT.SET, payload: response.data});
  } catch (error) {
    console.error(error);
    dispatch({type: GET_RECEIPT.FAILURE, error});
  }
};

export const updateReceipt = (data, callback) => async dispatch => {
  dispatch({type: UPDATE_RECEIPT.REQUEST});
  try {
    await axios.put('/receipt/update', data);

    dispatch({type: UPDATE_RECEIPT.SUCCESS});
    dispatch(getReceipt(data.receiptId));
    if (callback) {
      callback();
    }
  } catch (error) {
    console.error(error);
    dispatch({type: UPDATE_RECEIPT.FAILURE, error});
  }
};

export const showModifyReceiptModal = (receipt, updateReceipt) => dispatch => {
  dispatch(
    showModal({
      modalType: 'MODIFY_RECEIPT',
      modalProps: {receipt, updateReceipt},
    }),
  );
};

export const actions = {
  getReceipt,
  updateReceipt,
  showModifyReceiptModal,
};

