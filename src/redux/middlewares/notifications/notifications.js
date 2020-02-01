/*import {
  CALC_ALIVE_DEBT,
  SEARCH_REMITTANCES,
  SEARCH_REMITTANCE,
  SET_USER_PERMISSIONS,
  SEARCH_LOTS,
  SEND_RECOVERY_EMAIL_LIST,
  SEARCH_LOT,
  RECOVER_JUDICIAL,
  SET_OPERATION_COD,
  LOT_TRANSFERS,
  CLIENT,
  GET_RECOVERIES,
  PA_INCOMES,
  POSSIBLE_CLIENTS,
  APPLY_PAYMENT,
  PA_CONTRACTS,
  PA_CLIENT_COMMUNICATIONS,
  SEARCH_REMITTANCE_RECEIPTS,
  RETURNS_GET_DATA,
  GET_PERMISSION_LIST,
  GET_RECEIPT,
  EDIT_USER,
  DOWNLOAD_REMITTANCES,
  DOWNLOAD_LOTS,
  UPDATE_CERT_FILE,
} from 'action-types';
import {CREATE_TEMPLATE, REMOVE_TEMPLATE, UPDATE_TEMPLATE} from 'routes/Templates/modules/types';*/

const title = {
  info: 'INFORMACION',
  success: '¡DE LUJO!',
  warning: '¡ATENCIÓN!',
};

function setPayload(payload) {
  if (!payload || !payload.level) {
    return;
  }
  return {
    title: title[payload.level],
    ...payload,
  };
}

// Mandatory payload.level
const notifications = {};

export default notifications;
