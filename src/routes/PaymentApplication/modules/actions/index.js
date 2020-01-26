import axios from 'axios';

import {
  PA_RESET,
  PA_SET_STEP,
  PA_SET_INCOME,
  PA_SET_CONTRACT,
  PA_SET_CLIENTID,
  PA_INCOMES,
  PA_CONTRACTS,
  POSSIBLE_CLIENTS,
  PA_CLIENT_COMMUNICATIONS,
  APPLY_PAYMENT,
} from 'action-types';

export const STEPS = {
  INCOMES: 'INCOMES',
  APPLICATION: 'APPLICATION',
  SEMIMANUAL: 'SEMIMANUAL',
};

export const STEPS_LABELS = {
  INCOMES: 'Selección de ingreso',
  APPLICATION: 'Aplicar pago',
  SEMIMANUAL: 'Aplicación semimanual',
};

export * from './getPayments';
export const cancelPaymentApplication = step => ({type: PA_RESET});
export const setStep = step => ({type: PA_SET_STEP, step});

export const setIncome = income => dispatch => {
  dispatch({type: PA_SET_INCOME, income});
  dispatch(setStep(STEPS.APPLICATION));
};

export const setContract = contract => ({type: PA_SET_CONTRACT, contract});

export const getIncomes = () => async dispatch => {
  dispatch({type: PA_INCOMES.REQUEST});
  try {
    const response = await axios({url: '/income/incomePending'});
    dispatch({type: PA_INCOMES.SUCCESS});
    dispatch({type: PA_INCOMES.SET, payload: response.data});
  } catch (error) {
    console.error(error);
    dispatch({type: PA_INCOMES.FAILURE, error});
  }
};

export const getPossibleClients = incomeId => async dispatch => {
  if (!incomeId) {
    return;
  }
  dispatch({type: POSSIBLE_CLIENTS.REQUEST});
  try {
    const response = await axios({
      url: `/conciliate/possibleClient/${incomeId}`,
    });
    dispatch({type: POSSIBLE_CLIENTS.SUCCESS});
    if (response.data) {
      dispatch({type: POSSIBLE_CLIENTS.SET, payload: response.data});
    }
  } catch (error) {
    console.error(error);
    dispatch({type: POSSIBLE_CLIENTS.FAILURE, error});
  }
};

export const setClientId = clientId => ({type: PA_SET_CLIENTID, clientId});

export const getClientCommunications = clientId => async dispatch => {
  if (!clientId) {
    return;
  }
  dispatch({type: PA_CLIENT_COMMUNICATIONS.REQUEST});
  try {
    const response = await axios({
      url: `/comunication/getCommunicationsByClientId/${clientId}`,
    });
    dispatch({type: PA_CLIENT_COMMUNICATIONS.SUCCESS});
    dispatch({type: PA_CLIENT_COMMUNICATIONS.SET, payload: response.data});
  } catch (error) {
    console.error(error);
    dispatch({type: PA_CLIENT_COMMUNICATIONS.FAILURE, error});
  }
};

export const getContracts = clientId => async dispatch => {
  if (!clientId) {
    return;
  }
  dispatch(setClientId(clientId));
  dispatch({type: PA_CONTRACTS.REQUEST});
  try {
    const response = await axios({
      url: `/contract/getContractAndUnpaidReceiptByClientId/${clientId}`,
    });
    dispatch({type: PA_CONTRACTS.SUCCESS});
    dispatch({type: PA_CONTRACTS.SET, payload: response.data});

    if (response.data.length === 1) {
      const contract = response.data[0];
      dispatch(setContract(contract));
    }
  } catch (error) {
    console.error(error);
    dispatch({type: PA_CONTRACTS.FAILURE, error});
  }
};

export const applyPayment = (semimanual = false, condonation = {}) => async (
  dispatch,
  getState
) => {
  const paymentApplication = getState().paymentApplication;

  dispatch({type: APPLY_PAYMENT.REQUEST});
  try {
    const data = {
      contractId: paymentApplication.contract?.contractId,
      incomeId: paymentApplication.income?.incomeId,
      isManualCondonation: false,
      arreasFeesCondonation: parseFloat(condonation.arreasFeesCondonation || 0),
      delayInteresCondonation: parseFloat(
        condonation.delayInteresCondonation || 0
      ),
      arreasFeesTotalCondonation:
        Boolean(condonation.arreasFeesTotalCondonation) || false,
      delayInteresTotalCondonation:
        Boolean(condonation.delayInteresTotalCondonation) || false,
    };

    if (semimanual) {
      data.isManualCondonation = true;
    }

    const response = await axios({
      method: 'POST',
      url: '/conciliate/applyAllAmortisation',
      data,
    });

    if (response.status === 200) {
      dispatch({type: APPLY_PAYMENT.SET, payload: response.data});
      dispatch(setStep(STEPS.SEMIMANUAL));
      dispatch({
        type: APPLY_PAYMENT.SUCCESS,
        payload: {
          level: 'warning',
          title: 'ATENCIÓN!',
          message: 'Necesario proceso semimanual.',
        },
      });
    } else {
      dispatch(setStep(STEPS.INCOMES));
      dispatch({
        type: APPLY_PAYMENT.SUCCESS,
        payload: {
          level: 'success',
          message: 'Aplicado correctamente.',
        },
      });
      dispatch({type: PA_RESET});
    }
  } catch (error) {
    console.error(error);
    dispatch({type: APPLY_PAYMENT.FAILURE, error});
  }
};

export const actions = {
  cancelPaymentApplication,
  setStep,
  setIncome,
  setClientId,
  setContract,
  getIncomes,
  getContracts,
  getPossibleClients,
  getClientCommunications,
  applyPayment,
};


