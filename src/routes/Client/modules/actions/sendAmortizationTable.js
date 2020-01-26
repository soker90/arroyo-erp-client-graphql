import {CLIENT} from 'action-types';
import axios from 'axios';

/**
 * Request for sendToJudicial action
 * @returns {{type: string}}
 * @private
 */
const _sendAmortizationTableRequest = () => ({
  type: CLIENT.SEND_AMORTIZATION_TABLE.REQUEST,
  payload: {
    level: 'info',
    message: 'Enviando el cuadro de amortizaciones.',
  },
});

/**
 * Return success for getDataClient action
 * @returns {{type: string}}
 * @private
 */
const _sendAmortizationTableSuccess = () => ({
  type: CLIENT.SEND_AMORTIZATION_TABLE.SUCCESS,
  payload: {
    level: 'success',
    message: 'El cuadro se ha enviado al cliente.',
  },
});

/**
 * Return error for getDataClient action
 * @returns {{type: string}}
 * @private
 */
const _sendAmortizationTableError = error => ({
  type: CLIENT.SEND_AMORTIZATION_TABLE.FAILURE,
  error,
});

/**
 * Envia el cuadro de amortización al cliente por correo electronico
 * @param {Number} contractId
 * @returns {function(...[*]=)}
 */
export const sendAmortizationTable = contractId => async dispatch => {
  dispatch(_sendAmortizationTableRequest());
  try {
    const URL = `/comunication/sendMailWithListReceipts/${contractId}`;
    await axios.post(URL);

    dispatch(_sendAmortizationTableSuccess());
  } catch (error) {
    console.error(error);
    dispatch(_sendAmortizationTableError(error));
  }
};