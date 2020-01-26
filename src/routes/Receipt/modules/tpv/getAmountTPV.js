import {GET_AMOUNT_TPV} from '../types';
import axios from 'axios';

const getAmountTPVRequest = () => ({
  type: GET_AMOUNT_TPV.REQUEST,
});

const getAmountTPVSuccess = ({amount}) => ({
  type: GET_AMOUNT_TPV.SUCCESS,
  payload: {amountTPV: amount},
});

const getAmountTPVError = error => ({
  type: GET_AMOUNT_TPV.FAILURE,
  error,
});

export const getAmountTPV = receiptId =>
  async dispatch => {
    dispatch(getAmountTPVRequest());
    try {
      const response = await axios.get(`tpv/amount/${receiptId}`);

      dispatch(getAmountTPVSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(getAmountTPVError(error));
    }
  };
