import axios from 'axios';
import _ from 'lodash';
import {fetchRefinanceContractByClientId} from './fetchRefinanceContractByClientId';

import {renameTab} from 'components/Tabs/modules/tabs';

import {CLIENT} from 'action-types';

export const resetState = () => ({type: CLIENT.RESET});

export const getRecoveryByClient = (clientId, callback) => async dispatch => {
  dispatch({type: CLIENT.GET_RECOVERY.REQUEST});
  try {
    const response = await axios({
      url: `/recovery/getRecoveryByClient/${clientId}`,
    });
    if (response.status === 204) {
      dispatch({
        type: CLIENT.GET_RECOVERY.SUCCESS,
        payload: {
          level: 'info',
          message: 'Cliente al corriente de pago.',
        },
      });
    } else {
      dispatch({type: CLIENT.GET_RECOVERY.SET, payload: response.data});
      dispatch({
        type: CLIENT.GET_RECOVERY.SUCCESS,
        payload: {
          level: 'warning',
          message: 'Cliente en situación de impagos.',
        },
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.GET_RECOVERY.FAILURE, error});
  }
};

export const updateRecoveries = () => async dispatch => {
  dispatch({type: CLIENT.UPDATE_RECOVERIES.REQUEST});
  try {
    await axios.post('recovery/updateRecoveries');

    dispatch({
      type: CLIENT.UPDATE_RECOVERIES.SUCCESS,
      payload: {
        level: 'success',
        title: 'ACTUALIZADO RECOBROS',
        message: 'Se ha actualizado la lista de recobros.',
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({type: CLIENT.UPDATE_RECOVERIES.FAILURE, error});
  }
};

export const getClientData = (clientId, tabId = '') => async dispatch => {
  dispatch({type: CLIENT.GET.REQUEST});
  try {
    const response = await axios({url: `/client/${clientId}`});
    dispatch({type: CLIENT.GET.SUCCESS});
    dispatch({type: CLIENT.GET.SET, payload: response.data, clientId});
    if (tabId) {
      dispatch(renameTab(`${clientId}-${response.data.name}`, tabId));
    }
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.GET.FAILURE, error});
  }
};

export const saveClientData = (data, callback) => async (
  dispatch,
  getState
) => {
  const allowedData = [
    'name',
    'lastname',
    'birthday',
    'sex',
    'countryResidence',
    'countryBirth',
    'email',
    'mobile',
    'address',
    'zipcode',
    'province',
    'city',
    'email2',
    'mobile2',
    'addressNew',
    'zipcodeNew',
    'provinceNew',
    'cityNew',
  ];
  const clientId = getState().client.getIn(['client', 'clientId']);
  const body = _.pickBy(_.pick(data, allowedData), v => v !== '');
  body.clientId = clientId;

  try {
    await axios({url: '/client/update', method: 'PUT', data: body});
    dispatch(getClientData(clientId));
    dispatch({
      type: CLIENT.UPDATE.SUCCESS,
      payload: {
        level: 'success',
        message: 'Se han actualizado los datos del cliente.',
      },
    });

    if (callback) {
      callback();
    }
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.UPDATE.FAILURE, error});
  }
};

export const saveRecoveryData = (data, callback) => async (
  dispatch,
  getState
) => {
  dispatch({type: CLIENT.SAVE_RECOVERY.REQUEST});
  const allowedData = [
    'contractId',
    'clientId',
    'promiseDate',
    'nextProcess',
    'unpaidStatus',
    'judicial',
    'messagesNumber',
  ];
  const clientId = getState().client.getIn(['client', 'clientId']);
  const body = _.pickBy(_.pick(data, allowedData), v => v !== '');
  body.clientId = clientId;

  try {
    await axios({url: '/recovery/saveRecovery', method: 'POST', data: body});
    dispatch({
      type: CLIENT.SAVE_RECOVERY.SUCCESS,
      payload: {
        level: 'success',
        message: 'Se han actualizado los datos.',
      },
    });
    dispatch(getRecoveryByClient(clientId));
    if (callback) {
      callback();
    }
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.SAVE_RECOVERY.FAILURE, error});
  }
};

export const getDNIImages = clientId => async (dispatch, getState) => {
  clientId = clientId || getState().client.getIn(['client', 'clientId']);
  if (!clientId) {
    return;
  }

  dispatch({type: CLIENT.GET_IMAGES.REQUEST});
  try {
    const response = await axios({url: `/client/dni/${clientId}`});
    dispatch({type: CLIENT.GET_IMAGES.SUCCESS});
    dispatch({type: CLIENT.GET_IMAGES.SET, payload: response.data});
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.GET_IMAGES.FAILURE, error});
  }
};

export const getCoDniImages = () => async (dispatch, getState) => {
  const clientId = getState().client.getIn(['client', 'clientId']);

  dispatch({type: CLIENT.GET_CO_IMAGES.REQUEST});
  try {
    const response = await axios({url: `/client/cotitularDni/${clientId}`});
    dispatch({type: CLIENT.GET_CO_IMAGES.SUCCESS});
    dispatch({type: CLIENT.GET_CO_IMAGES.SET, payload: response.data});
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.GET_CO_IMAGES.FAILURE, error});
  }
};

export const uploadFiles = (docId, file, contractId) => async dispatch => {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  const headers = {'Content-Type': 'multipart/form-data'};

  dispatch({type: CLIENT.UPDATE_IMAGES.REQUEST});
  try {
    await axios({
      url: `/contract/upload_file/${contractId}/${docId}`,
      method: 'PUT',
      data: formData,
      headers,
    });
    dispatch({type: CLIENT.UPDATE_IMAGES.SUCCESS});
    dispatch(getDNIImages());
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.UPDATE_IMAGES.FAILURE, error});
  }
};

export const uploadImage = (type, file) => async (dispatch, getState) => {
  const contractId = getState().client.toJS()?.contracts?.[0]?.contractId;
  const clientId = getState().client.getIn(['client', 'clientId']);
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  const headers = {'Content-Type': 'multipart/form-data'};

  dispatch({type: CLIENT.UPDATE_IMAGES.REQUEST});
  try {
    await axios({
      url: `/contract/upload_file/${contractId}/${type}`,
      method: 'PUT',
      data: formData,
      headers,
    });
    dispatch({type: CLIENT.UPDATE_IMAGES.SUCCESS});
    dispatch(getDNIImages(clientId));
    dispatch(getCoDniImages(clientId));
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.UPDATE_IMAGES.FAILURE, error});
  }
};

export const getClientContracts = clientId => async dispatch => {
  dispatch({type: CLIENT.CONTRACTS.REQUEST});
  try {
    const response = await axios({url: `/contract/list/${clientId}`});
    dispatch({type: CLIENT.CONTRACTS.SUCCESS});
    dispatch({type: CLIENT.CONTRACTS.SET, payload: response.data});

    if (!_.isEmpty(response.data)) {
      response.data.forEach(contract => {
        if (contract.opsType !== null) {
          dispatch({type: CLIENT.REFINANCED.SET, payload: contract.opsType});
        }
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.CONTRACTS.FAILURE, error});
  }
};

export const getClientCommunications = clientId => async dispatch => {
  dispatch({type: CLIENT.COMMUNICATIONS.REQUEST});
  try {
    const response = await axios({
      url: `/client/comunications/list/${clientId}`,
    });
    dispatch({type: CLIENT.COMMUNICATIONS.SUCCESS});
    dispatch({type: CLIENT.COMMUNICATIONS.SET, payload: response.data});
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.COMMUNICATIONS.FAILURE, error});
  }
};

export const getCommunication = communicationId => async dispatch => {
  dispatch({type: CLIENT.COMMUNICATION.REQUEST});
  try {
    const response = await axios({
      url: `/client/comunications/${communicationId}`,
    });
    dispatch({type: CLIENT.COMMUNICATION.SUCCESS});
    dispatch({type: CLIENT.COMMUNICATION.SET, payload: response.data});
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.COMMUNICATION.FAILURE, error});
  }
};

export const setCommunication = data => async (dispatch, getState) => {
  const allowedData = [
    'comunicationTypeDescription',
    'dateComunication',
    'summary',
    'text',
    'directionType',
    'answer',
    'isEmailSent',
  ];
  const clientId = getState().client.getIn(['client', 'clientId']);
  const body = _.pickBy(_.pick(data, allowedData), v => v !== '');
  body.clientId = clientId;

  dispatch({type: CLIENT.SEND_COMMUNICATION.REQUEST});
  try {
    await axios.post(`/client/comunications/${clientId}`, body);

    dispatch({
      type: CLIENT.SEND_COMMUNICATION.SUCCESS,
      payload: {
        level: 'success',
        message: 'Se han actualizado las comunicaciónes con el cliente.',
      },
    });
    dispatch(getClientCommunications(clientId));
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.SEND_COMMUNICATION.FAILURE, error});
  }
};

export const sendEmail = data => async (dispatch, getState) => {
  const allowedData = ['summary', 'text', 'emailFrom'];
  const clientId = getState().client.getIn(['client', 'clientId']);
  const body = _.pickBy(_.pick(data, allowedData), v => v !== '');
  body.clientId = clientId;
  body.directionType = 'O';
  body.comunicationTypeId = 2;
  body.dateComunication = Date.now();
  body.answer = 1;

  dispatch({type: CLIENT.SEND_EMAIL_COMMUNICATION.REQUEST});
  try {
    await axios.put('/client/communication/sendEmail', body);

    dispatch(getClientCommunications(clientId));
    dispatch({
      type: CLIENT.SEND_EMAIL_COMMUNICATION.SUCCESS,
      payload: {
        level: 'success',
        message: `Email enviado a ${clientId}`,
      },
    });
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.SEND_EMAIL_COMMUNICATION.FAILURE, error});
  }
};

export const resetPassword = () => async (dispatch, getState) => {
  const clientId = getState().client.getIn(['client', 'clientId']);
  dispatch({type: CLIENT.SEND_SMS_COMMUNICATION.REQUEST});
  try {
    await axios.post(
      `/client/communication/sendClientAccountActivationToken/${clientId}`
    );

    dispatch({
      type: CLIENT.SEND_SMS_COMMUNICATION.SUCCESS,
      payload: {
        level: 'success',
        message: `Contraseña enviada al cliente ${clientId}`,
      },
    });
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.SEND_SMS_COMMUNICATION.FAILURE, error});
  }
};

export const getContract = contractId => async dispatch => {
  dispatch({type: CLIENT.CONTRACT.REQUEST});
  try {
    const response = await axios({url: `/contract/info/${contractId}`});
    dispatch({type: CLIENT.CONTRACT.SUCCESS});
    dispatch({type: CLIENT.CONTRACT.SET, payload: response.data});
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.CONTRACT.FAILURE, error});
  }
};

export const getReceipts = contractId => async dispatch => {
  dispatch({type: CLIENT.RECEIPTS.REQUEST});
  try {
    const response = await axios({url: `/receipt/list/${contractId}`});
    dispatch({type: CLIENT.RECEIPTS.SUCCESS});
    dispatch({type: CLIENT.RECEIPTS.SET, payload: response.data});
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.RECEIPTS.FAILURE, error});
  }
};

export const getReceipt = receiptId => async dispatch => {
  dispatch({type: CLIENT.RECEIPT.REQUEST});
  try {
    const response = await axios({url: `/receipt/info/${receiptId}`});
    dispatch({type: CLIENT.RECEIPT.SUCCESS});
    dispatch({type: CLIENT.RECEIPT.SET, payload: response.data});
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.RECEIPT.FAILURE, error});
  }
};

export const updateReceipt = data => async (dispatch, getState) => {
  const receiptId = getState().client.getIn(['receipt', 'receiptId']);
  dispatch({type: CLIENT.UPDATE_RECEIPT.REQUEST});
  try {
    await axios({url: '/restfinance/receipt/update', method: 'PUT', data});
    dispatch(getReceipt(receiptId));
    dispatch({
      type: CLIENT.UPDATE_RECEIPT.SUCCESS,
      payload: {
        level: 'success',
        message: `Modificado recibo ${receiptId}`,
      },
    });
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.UPDATE_RECEIPT.FAILURE, error});
  }
};

export const changeIBAN = iban => async (dispatch, getState) => {
  const contractId = getState().client.getIn(['contract', 'contractId']);
  const body = {chargeAccount: iban};
  dispatch({type: CLIENT.UPDATE_IBAN.REQUEST});
  try {
    await axios({
      url: `/contract/changeAccount/${contractId}`,
      method: 'PUT',
      data: body,
    });
    dispatch(getContract(contractId));
    dispatch({
      type: CLIENT.UPDATE_IBAN.SUCCESS,
      payload: {
        level: 'success',
        message: 'IBAN actualizado.',
      },
    });
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.UPDATE_IBAN.FAILURE, error});
  }
};

export const uploadContract = file => async (dispatch, getState) => {
  const contractId = getState().client.getIn(['contract', 'contractId']);
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  const headers = {'Content-Type': 'multipart/form-data'};

  dispatch({type: CLIENT.UPDATE_CONTRACT.REQUEST});
  try {
    await axios({
      url: `/contract/docs/${contractId}`,
      method: 'PUT',
      data: formData,
      headers,
    });
    dispatch(getContract(contractId));
    dispatch({
      type: CLIENT.UPDATE_CONTRACT.SUCCESS,
      payload: {
        level: 'success',
        message: 'El contrato se ha subido correctamente.',
      },
    });
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.UPDATE_CONTRACT.FAILURE, error});
  }
};

export const downloadContract = () => async (dispatch, getState) => {
  const contractId = getState().client.getIn(['contract', 'contractId']);

  dispatch({type: CLIENT.DOWNLOAD_CONTRACT.REQUEST});
  try {
    const response = await axios({
      url: `/contract/docs/${contractId}`,
      method: 'GET',
    });
    const a = document.createElement('a');
    a.textContent = `contract_${contractId}.pdf`;
    a.download = `contract_${contractId}.pdf`;
    a.href = `data:application/pdf;base64,/${encodeURIComponent(
      response.data.contract_sign
    )}`;
    a.click();
    dispatch({type: CLIENT.DOWNLOAD_CONTRACT.SUCCESS});
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.DOWNLOAD_CONTRACT.FAILURE, error});
  }
};

export const getPrescriber = contractId => async (dispatch, getState) => {
  dispatch({type: CLIENT.PRESCRIBER.REQUEST});
  try {
    const response = await axios({
      url: `/prescriber/getPrescriberByContractId/${contractId}`,
    });
    dispatch({type: CLIENT.PRESCRIBER.SUCCESS});

    // TODO: remove
    let payload = {};
    if (_.isObject(response.data)) {
      payload = response.data;
    }
    dispatch({type: CLIENT.PRESCRIBER.SET, payload});
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.PRESCRIBER.FAILURE, error});
  }
};

export const sendToJudicial = clientId => async dispatch => {
  dispatch({type: CLIENT.SEND_TO_JUDICIAL.REQUEST});

  try {
    const URL = `/comunication/sendMailWithExpDebt/${clientId}`;
    await axios.post(URL);

    dispatch({type: CLIENT.SEND_TO_JUDICIAL.SUCCESS});
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.SEND_TO_JUDICIAL.FAILURE, error});
  }
};

export const setClientContactInfo = data => async dispatch => {
  dispatch({type: CLIENT.SET_CONTACT_INFO.REQUEST});

  try {
    const URL = '/client/updateClientContactInfo';
    await axios.put(URL, data);

    dispatch(getContactInfo(data.clientId));
    dispatch({
      type: CLIENT.SET_CONTACT_INFO.SUCCESS,
      payload: {
        level: 'success',
        message: 'Se ha actualizado la información de contacto.',
      },
    });
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.SET_CONTACT_INFO.FAILURE, error});
  }
};

export const getContactInfo = clientId => async dispatch => {
  dispatch({type: CLIENT.GET_CONTACT_INFO.REQUEST});

  try {
    const URL = `/client/clientContactInfo/${clientId}`;
    const response = await axios(URL);

    const orderedList = response.data.sort(
      (a, b) => a.clientContactInfoId - b.clientContactInfoId
    );

    dispatch({type: CLIENT.GET_CONTACT_INFO.SUCCESS});
    dispatch({type: CLIENT.GET_CONTACT_INFO.SET, payload: orderedList});
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.GET_CONTACT_INFO.FAILURE, error});
  }
};

const sendAmortizationTable = contractId => async dispatch => {
  dispatch({type: CLIENT.SEND_AMORTIZATION_TABLE.REQUEST});
  try {
    const URL = `/comunication/sendMailWithListReceipts/${contractId}`;
    await axios.post(URL);

    dispatch({
      type: CLIENT.SEND_AMORTIZATION_TABLE.SUCCESS,
      payload: {
        level: 'success',
        message: 'El cuadro se ha enviado al cliente.',
      },
    });
  } catch (error) {
    console.error(error);
    dispatch({type: CLIENT.SEND_AMORTIZATION_TABLE.FAILURE, error});
  }
};

export const actions = {
  resetState,
  getClientData,
  saveClientData,
  saveRecoveryData,
  uploadImage,
  uploadFiles,
  getDNIImages,
  getCoDniImages,
  getClientContracts,
  getClientCommunications,
  getCommunication,
  setCommunication,
  sendEmail,
  resetPassword,
  getContract,
  getReceipts,
  changeIBAN,
  uploadContract,
  downloadContract,
  getPrescriber,
  getRecoveryByClient,
  sendToJudicial,
  setClientContactInfo,
  getContactInfo,
  sendAmortizationTable,
  updateRecoveries,
  fetchRefinanceContractByClientId,
};

export * from './fetchRefinanceContractByClientId';

/*
/neraData/client/updateClientContactInfo
un PUT

*/
