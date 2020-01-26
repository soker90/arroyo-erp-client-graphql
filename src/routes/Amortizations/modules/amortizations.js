import Immutable from 'immutable';
import axios from 'axios';
import createReducer from 'redux/create-reducer';

import {
  SET_AMORTIZATIONS_CONTRACT,
  GET_CONTRACTS_FOR_AMORTIZATIONS,
  CALC_ALIVE_DEBT,
} from 'action-types';

const RESET = 'amortizations/RESET';

export const setContract = contract => dispatch => {
  dispatch({type: SET_AMORTIZATIONS_CONTRACT, contract});
};

export const getContracts = clientId => dispatch => {
  dispatch({type: GET_CONTRACTS_FOR_AMORTIZATIONS.REQUEST});

  return axios({
    method: 'GET',
    url: `/contract/getContractAndUnpaidReceiptByClientId/${clientId}`,
  })
    .then(response => {
      dispatch({
        type: GET_CONTRACTS_FOR_AMORTIZATIONS.SET,
        payload: response.data,
      });
      dispatch({type: GET_CONTRACTS_FOR_AMORTIZATIONS.SUCCESS});

      if (response.data.length === 1) {
        dispatch(setContract(response.data[0]));
      }
    })
    .catch(error => {
      console.error(error);
      dispatch({type: GET_CONTRACTS_FOR_AMORTIZATIONS.FAILURE, error});
    });
};

export const getAliveDebt = (data, callback) => dispatch => {
  const {
    contractId,
    calculDate,
    newContractAmount,
    operationType = null,
  } = data;

  const body = {
    contractId,
    calculDate,
    operationType,
    newContractAmount,
  };

  dispatch({type: CALC_ALIVE_DEBT.REQUEST});
  return axios({
    method: 'POST',
    url: '/contract/getAliveDebt',
    data: body,
  })
    .then(response => {
      let notification;

      if (operationType) {
        if (operationType === 'Amortizacion') {
          notification = {
            title: 'Amortización',
            message: 'Email de amortización enviado',
          };
        }

        if (operationType === 'Consolidacion') {
          notification = {
            title: 'Consolidación',
            message: 'Email de consolidación enviado',
          };
        }

        if (operationType === 'Refinanciacion') {
          notification = {
            title: 'Refinanciación',
            message: 'Email de refinanciación enviado',
          };
        }
        dispatch({
          type: CALC_ALIVE_DEBT.SUCCESS,
          payload: {
            level: 'info',
            ...notification,
          },
        });
      }

      dispatch({type: CALC_ALIVE_DEBT.SUCCESS});
      dispatch({type: CALC_ALIVE_DEBT.SET, payload: response.data});
      if (callback) {
        callback();
      }
    })
    .catch(error => {
      console.error(error);
      dispatch({type: CALC_ALIVE_DEBT.FAILURE, error});
    });
};

export const resetStore = () => dispatch => {
  dispatch({type: RESET});
};

export const actions = {
  setContract,
  getContracts,
  getAliveDebt,
  resetStore,
};

const INITIAL_STATE = Immutable.fromJS({
  clientId: null,
  contracts: [],
  contract: {},
  position: {},
});

const ACTION_HANDLERS = {
  [SET_AMORTIZATIONS_CONTRACT]: (state, {contract}) =>
    state.set('contract', Immutable.fromJS(contract)),
  [GET_CONTRACTS_FOR_AMORTIZATIONS.SET]: (state, {clientId}) =>
    state.set('clientId', clientId),
  [GET_CONTRACTS_FOR_AMORTIZATIONS.SET]: (state, {payload}) =>
    state.set('contracts', Immutable.fromJS(payload)),
  [CALC_ALIVE_DEBT.SET]: (state, {payload}) =>
    state.set('position', Immutable.fromJS(payload)),
  [RESET]: () => INITIAL_STATE,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
