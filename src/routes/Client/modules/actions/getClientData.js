import {CLIENT} from 'action-types';
import axios from 'axios';
import {renameTab} from 'components/Tabs/modules/tabs';

/**
 * Request for getDataClient action
 * @returns {{type: string}}
 * @private
 */
const _getClientDataRequest = () => ({
  type: CLIENT.GET.REQUEST,
});

/**
 * Return success for getDataClient action
 * @returns {{type: string}}
 * @private
 */
const _getClientDataSuccess = () => ({
  type: CLIENT.GET.SUCCESS,
});

/**
 * Return set for getDataClient action
 * @returns {{type: string}}
 * @private
 */
const _getClientDataSet = ({data}, clientId) => ({
  type: CLIENT.GET.SET,
  payload: {
    client: data,
    clientId,
  },
});


/**
 * Return error for getDataClient action
 * @returns {{type: string}}
 * @private
 */
const _getClientDataError = error => ({
  type: CLIENT.GET.FAILURE,
  error,
});

/**
 * Get client data and save in redux
 * @param clientId
 * @param tabId
 * @returns {function(...[*]=)}
 */
export const getClientData = (clientId, tabId = '') => async dispatch => {
  dispatch(_getClientDataRequest());
  try {
    const response = await axios({url: `/client/${clientId}`});
    dispatch(_getClientDataSuccess());
    dispatch(_getClientDataSet(response, clientId));
    if (tabId) {
      dispatch(renameTab(`${clientId || ''}-${response.data.name}`, tabId));
    }
  } catch (error) {
    console.error(error);
    dispatch(_getClientDataError(error));
  }
};