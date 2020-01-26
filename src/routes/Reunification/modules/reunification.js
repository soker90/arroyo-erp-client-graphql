import axios         from 'axios';
import IBAN          from 'iban';
import createReducer from 'redux/create-reducer';
import {
  GET_REUNIFICATION_LOANS,
  GET_REUNIFICATION_LOANS_AMOUNT,
  GET_ENTITIES_LIST,
  SET_REUNIFICATION_DATA,
  UPDATE_REUNIFICATION,
  HANDLE_REUNIFICATION_STATUS,
  UPDATE_CERT_FILE,
  DELETE_REUNIFICATION_LOAN,
}                    from 'action-types';
import {removeTab}   from '../../../components/Tabs/modules/tabs';

const getEntitiesList = () => async dispatch => {
  dispatch({type: GET_ENTITIES_LIST.REQUEST});

  try {
    const URL = '/reunification/getAllReunificationBankEntity';
    const response = await axios(URL);

    dispatch({type: GET_ENTITIES_LIST.SUCCESS});
    dispatch({type: GET_ENTITIES_LIST.SET, payload: response.data});
  } catch (error) {
    console.error(error);
    dispatch({type: GET_ENTITIES_LIST.FAILURE, error});
  }
};

const getReunificationLoans = reunificationId => async dispatch => {
  dispatch({type: GET_REUNIFICATION_LOANS.REQUEST});

  try {
    const URL = `/reunification/getReunificationLoans/${reunificationId}`;
    const response = await axios(URL);

    dispatch({type: GET_REUNIFICATION_LOANS.SUCCESS});
    dispatch({type: GET_REUNIFICATION_LOANS.SET, payload: response.data});
    dispatch(getLoansAmount(response.data.reunificationLoansDtoList));
  } catch (error) {
    console.error(error);
    dispatch({type: GET_REUNIFICATION_LOANS.FAILURE, error});
  }
};

const getLoansAmount = loans => dispatch => {
  let totalLoansAmount = 0;

  loans.forEach(loan => {
    if (loan.entityName !== 'CLIENTE' && loan.amount) {
      totalLoansAmount += Number(loan.amount);
    }
  });

  dispatch({
    type: GET_REUNIFICATION_LOANS_AMOUNT.SET,
    payload: totalLoansAmount,
  });
};

const createReunificationLoan = reunificationId => async dispatch => {
  dispatch({type: SET_REUNIFICATION_DATA.REQUEST});

  try {
    const data = {amount: 0, entityName: '-', iban: ''};
    const URL = `/reunification/createUpdateReunificationLoans/${reunificationId}`;
    await axios.put(URL, data);

    dispatch({type: SET_REUNIFICATION_DATA.SUCCESS});
    dispatch(getReunificationLoans(reunificationId));
  } catch (error) {
    console.error(error);
    dispatch({type: SET_REUNIFICATION_DATA.FAILURE, error});
  }
};

const updateReunificationLoanData = (data, callback) => async dispatch => {
  dispatch({type: UPDATE_REUNIFICATION.REQUEST});

  try {
    const URL = `/reunification/createUpdateReunificationLoans/${
      data.reunificationId
    }`;
    await axios.put(URL, data);

    dispatch({type: UPDATE_REUNIFICATION.SUCCESS});
    dispatch(getReunificationLoans(data.reunificationId));
    callback();
  } catch (error) {
    console.error(error);
    dispatch({type: UPDATE_REUNIFICATION.FAILURE, error});
  }
};

const deleteReunificationLoan = (
  reunificationId,
  reunificationEntityId,
  callback,
) => async dispatch => {
  dispatch({type: DELETE_REUNIFICATION_LOAN.REQUEST});

  try {
    const URL = `/reunification/deleteUpdateReunificationLoans/${reunificationEntityId}`;
    await axios.put(URL);

    dispatch({type: DELETE_REUNIFICATION_LOAN.SUCCESS});
    dispatch(getReunificationLoans(reunificationId));
    callback();
  } catch (error) {
    console.error(error);
    dispatch({type: DELETE_REUNIFICATION_LOAN.FAILURE, error});
  }
};

export const parseIBAN = iban => {
  if (iban) {
    return `${iban[0].toUpperCase()}${iban[1]}${iban[2]}${iban[3]}${iban[4]}`;
  }
  return '';
};

export const validateLoanForm = (data, callback) => {
  const validForm = {...data};
  if (validForm.entitySelect !== 'manual') {
    validForm.entityName = validForm.entitySelect;
  }

  const isIBANValid = IBAN.isValid(parseIBAN(validForm.iban));
  if (isIBANValid) {
    callback(parseIBAN(validForm.iban));
  } else {
    callback();
  }
};

export const handleReunificationStatus = (
  {reunificationId, statusCod, templateShortDescription, closeTab},
  callback,
) => async dispatch => {
  dispatch({type: HANDLE_REUNIFICATION_STATUS.REQUEST});

  try {
    const URL = `/reunification/updateReunificationStatus/${reunificationId}`;
    await axios.put(URL, {statusCod, templateShortDescription});

    dispatch({type: HANDLE_REUNIFICATION_STATUS.SUCCESS});
    if (closeTab)
      dispatch(removeTab(closeTab));
    else
      dispatch(getReunificationLoans(reunificationId));
    callback && callback();
  } catch (error) {
    console.error(error);
    dispatch({type: HANDLE_REUNIFICATION_STATUS.FAILURE, error});
  }
};

const uploadCertFile = (reuId, loanId, template, file) => async dispatch => {
  dispatch({type: UPDATE_CERT_FILE.REQUEST});

  try {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    const headers = {'Content-Type': 'multipart/form-data'};
    const URL = `/reunification/upload_file/${reuId}/${loanId}/${template}`;
    await axios({
      url: URL,
      method: 'PUT',
      data: formData,
      headers,
    });

    dispatch({
      type: UPDATE_CERT_FILE.SUCCESS,
      payload: {
        level: 'success',
        title: 'FICHERO SUBIDO',
        message: 'Se ha subido correctamente el archivo al servidor.',
      },
    });

    dispatch(getReunificationLoans(reuId));
  } catch (error) {
    console.error(error);
    dispatch({type: UPDATE_CERT_FILE.FAILURE, error});
  }
};

export const handleDownloadCert = async (type, fileUrl, loanId) => {
  try {
    const response = await axios.post(
      '/reunification/docsByUrl',
      {
        url: fileUrl,
      },
      {responseType: 'blob'},
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', response.headers.filename);
    document.body.appendChild(link);
    link.click();
  } catch (err) {
    console.error(err);
  }
};

function orderEntityList(list) {
  return list.sort((a, b) => a.name.localeCompare(b.name));
}

export const actions = {
  getReunificationLoans,
  getEntitiesList,
  createReunificationLoan,
  updateReunificationLoanData,
  getLoansAmount,
  handleReunificationStatus,
  uploadCertFile,
  deleteReunificationLoan,
};

const defaultReunificationData = {
  reunificationId: 0,
  clientId: 0,
  clientListItemsDto: {},
  operationDate: 0,
  amount: 0,
  certValidation: false,
  ccValidation: false,
  paymentLetter: false,
  reunificationValidation: false,
  statusCod: '',
  reunificationLoansDtoList: [],
};

const INITIAL_STATE = {
  reunificationData: defaultReunificationData,
  entitiesList: [],
  loansTotalAmount: 0,
};

const ACTION_HANDLERS = {
  [GET_REUNIFICATION_LOANS.REQUEST]: state => ({
    ...state,
    reunificationData: defaultReunificationData,
  }),
  [GET_REUNIFICATION_LOANS.SET]: (state, {payload}) => ({
    ...state,
    reunificationData: payload,
  }),
  [GET_REUNIFICATION_LOANS.FAILURE]: (state, {payload}) => ({
    ...state,
    reunificationData: payload,
  }),
  [GET_REUNIFICATION_LOANS_AMOUNT.SET]: (state, {payload}) => ({
    ...state,
    loansTotalAmount: payload,
  }),
  [GET_ENTITIES_LIST.REQUEST]: state => ({...state, entitiesList: []}),
  [GET_ENTITIES_LIST.SET]: (state, {payload}) => ({
    ...state,
    entitiesList: orderEntityList(payload),
  }),
  [GET_ENTITIES_LIST.FAILURE]: (state, {payload}) => ({
    ...state,
    entitiesList: payload,
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
