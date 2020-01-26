import axios from 'axios';
import {SEND_PAYMENT_TPV} from '../types';

const sendPaymentTPVRequest = () => ({
  type: SEND_PAYMENT_TPV.REQUEST,
  payload: {
    pendingPayment: true,
  },
});

const sendPaymentTPVSuccess = () => ({
  type: SEND_PAYMENT_TPV.SUCCESS,
  payload: {
    pendingPayment: false,
  },
});

const sendPaymentTPVError = error => ({
  type: SEND_PAYMENT_TPV.FAILURE,
  payload: {error},
});

export const sendPaymentTPV = data =>
  async dispatch => {
    dispatch(sendPaymentTPVRequest());
    try {
      const response = await axios.post('tpv/payment', data);

      response ?
      dispatch(sendPaymentTPVSuccess()):
      dispatch(sendPaymentTPVError(response));
    } catch (error) {
      console.error(error);
      dispatch(sendPaymentTPVError(error));
    }
  };
