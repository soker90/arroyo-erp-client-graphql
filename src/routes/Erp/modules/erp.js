import Immutable from 'immutable';
import axios from 'axios';
import createReducer from 'redux/create-reducer';
import {pickBy} from 'lodash';

import {
  ERP_DOWNLOAD_HISTORY,
  ERP_DOWNLOAD_CSV,
  ERP_EXPORT_CSV,
  EXECUTE_SCRIPT,
} from 'action-types';

export const getDownloadHistory = () => async dispatch => {
  dispatch({type: ERP_DOWNLOAD_HISTORY.REQUEST});
  try {
    const response = await axios({url: '/murano/'});
    dispatch({type: ERP_DOWNLOAD_HISTORY.SUCCESS});
    dispatch({type: ERP_DOWNLOAD_HISTORY.SET, payload: response.data});
  } catch (error) {
    console.error(error);
    dispatch({type: ERP_DOWNLOAD_HISTORY.FAILURE, error, title: 'ERROR histórico de descargas'});
  }
};

export const downloadFile = filename => async dispatch => {
  dispatch({type: ERP_DOWNLOAD_CSV.REQUEST});
  try {
    const response = await axios({url: `/murano/download/${filename}`, responseType: 'blob'});
    dispatch({type: ERP_DOWNLOAD_CSV.SUCCESS});
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error(error);
    dispatch({type: ERP_DOWNLOAD_CSV.FAILURE, error, title: 'ERROR descargar el fichero'});
  }
};

export const executeScript = form => async dispatch => {
  const data = pickBy(form, v => ![null, '', undefined].includes(v));
  dispatch({type: EXECUTE_SCRIPT.REQUEST});
  try {
    const response = await axios({
      method: 'POST',
      url: '/murano/executeScript',
      responseType: 'blob',
      data: {
        startDate: data.startDate,
        endDate: data.endDate,
        script: data.script,
      },
    });
    dispatch({type: ERP_EXPORT_CSV.SUCCESS});
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MURANO_${data.script}_${data.startDate}_${data.endDate}.csv`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error(error);
    dispatch({type: ERP_EXPORT_CSV.FAILURE, error, title: 'ERROR ejecutar script'});
  }
};

export const actions = {
  getDownloadHistory,
  executeScript,
  downloadFile,
};

const INITIAL_STATE = Immutable.fromJS({
  downloadHistory: [],
});


const ACTION_HANLDERS = {
  [ERP_DOWNLOAD_HISTORY.SET]: (state, {payload}) => state.set('downloadHistory', Immutable.List(payload)),
};

export default createReducer(INITIAL_STATE, ACTION_HANLDERS);
