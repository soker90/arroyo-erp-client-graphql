// Magic
export const requestActions = actionName => ({
    REQUEST: `${actionName}_REQUEST`,
    SUCCESS: `${actionName}_SUCCESS`,
    FAILURE: `${actionName}_FAILURE`,
    SET: `${actionName}_SET`,
});

// Errors
export const AUTHORIZATION_ERROR = requestActions('errors/AUTHORIZATION_ERROR');

// App
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

// Tabs
export const ACTIVATE_TAB = 'ACTIVATE_TAB';
export const REMOVE_TAB = 'REMOVE_TAB';
export const SAVE_TAB = 'SAVE_TAB';
export const ORDER_TABS = 'ORDER_TABS';
export const RENAME_TAB = 'RENAME_TAB';

// Auth
export const LOGIN = requestActions('auth/LOGIN');

// ARROYO
export const SEARCH = requestActions('search/SEARCH_REQUEST');

// AmortizationCommunication
export const GET_CONTRACTS_FOR_AMORTIZATIONS = requestActions(
  'amortizations/GET_CONTRACTS_FOR_AMORTIZATIONS'
);
export const SET_AMORTIZATIONS_CONTRACT =
  'amortizations/SET_AMORTIZATIONS_CONTRACT';
export const CALC_ALIVE_DEBT = requestActions('amortizations/CALC_ALIVE_DEBT');

// Common
export const DROPDOWNS = requestActions('common/DROPDOWNS');
export const AMORTIZATION_TYPES = requestActions('common/AMORTIZATION_TYPES');
export const ERP_TYPES = requestActions('common/ERP_TYPES');
export const EMAIL_TEMPLATES = requestActions('common/EMAIL_TEMPLATES');
export const RECOVER_FILTERS = requestActions('common/RECOVER_FILTERS');

// DiaRefusedReceipts
export const DIA_REFUSED_RECEIPTS = requestActions(
  'common/DIA_REFUSED_RECEIPTS'
);

// Import-csv
export const UPLOAD_CSV = requestActions('import-csv/UPLOAD_CSV');

// PaymentApplication
export const PA_RESET = 'payment-application/PA_RESET';
export const PA_SET_STEP = 'payment-application/PA_SET_STEP';
export const PA_SET_INCOME = 'payment-application/PA_SET_INCOME';
export const PA_SET_CONTRACT = 'payment-application/PA_SET_CONTRACT';
export const PA_SET_CLIENTID = 'payment-application/PA_SET_CLIENTID';
export const PA_INCOMES = requestActions('payment-application/PA_INCOMES');
export const PA_CONTRACTS = requestActions('payment-application/PA_CONTRACTS');
export const POSSIBLE_CLIENTS = requestActions(
  'payment-application/POSSIBLE_CLIENTS'
);
export const PA_CLIENT_COMMUNICATIONS = requestActions(
  'payment-application/PA_CLIENT_COMMUNICATIONS'
);
export const APPLY_PAYMENT = requestActions(
  'payment-application/APPLY_PAYMENT'
);

// Conciliation
export const CON_SET_INCOME = 'conciliation/CON_SET_INCOME';
export const CON_UNSET_INCOME = 'conciliation/CON_UNSET_INCOME';
export const UPLOAD_CONCILIATION = requestActions(
  'conciliation/UPLOAD_CONCILIATION'
);
export const APPLY_CONCILIATION = requestActions(
  'conciliation/APPLY_CONCILIATION'
);
export const PENDING_REMITTANCES = requestActions(
  'conciliation/PENDING_REMITTANCES'
);
export const PENDING_TRANSFERS = requestActions(
  'conciliation/PENDING_TRANSFERS'
);
export const UNPAID_RECEIPTS = requestActions('conciliation/UNPAID_RECEIPTS');
export const PENDING_INCOMES = requestActions('conciliation/PENDING_INCOMES');
export const PENDING_TPV = requestActions('PENDING_TPV');

// ERP
export const ERP_DOWNLOAD_HISTORY = requestActions('erp/ERP_DOWNLOAD_HISTORY');
export const ERP_DOWNLOAD_CSV = requestActions('erp/ERP_DOWNLOAD_CSV');
export const ERP_EXPORT_CSV = requestActions('erp/ERP_EXPORT_CSV');
export const EXECUTE_SCRIPT = requestActions('erp/EXECUTE_SCRIPT');

// Receipts
export const SEARCH_RECEIPTS = requestActions('receipts/SEARCH_RECEIPTS');
export const SEARCH_REMITTANCE_RECEIPTS = requestActions(
  'receipts/SEARCH_REMITTANCE_RECEIPTS'
);

// Receipt
export const CLEAR_RECEIPT = 'receipt/CLEAR_RECEIPT';
export const GET_RECEIPT = requestActions('receipt/GET_RECEIPT');
export const UPDATE_RECEIPT = requestActions('receipt/UPDATE_RECEIPT');

// Client
export const GET_CLIENT = requestActions('client/GET_CLIENT');
export const UPDATE_CLIENT = requestActions('client/UPDATE_CLIENT');
export const CLIENT_GET_IMAGES = requestActions('client/CLIENT_GET_IMAGES');
export const CLIENT_GET_CO_IMAGES = requestActions(
  'client/CLIENT_GET_CO_IMAGES'
);
export const CLIENT_UPLOAD_IMAGES = requestActions(
  'client/CLIENT_UPLOAD_IMAGES'
);
export const CLIENT_COMMUNICATIONS = requestActions(
  'client/CLIENT_COMMUNICATIONS'
);
export const CLIENT_COMMUNICATION = requestActions(
  'client/CLIENT_COMMUNICATION'
);
export const SEND_COMMUNICATION = requestActions('client/SEND_COMMUNICATION');
export const SEND_EMAIL_COMMUNICATION = requestActions(
  'client/SEND_EMAIL_COMMUNICATION'
);
export const SEND_SMS_COMMUNICATION = requestActions(
  'client/SEND_SMS_COMMUNICATION'
);
export const CLIENT_CONTRACTS = requestActions('client/CLIENT_CONTRACTS');
export const CLIENT_CONTRACT = requestActions('client/CLIENT_CONTRACT');
export const CLIENT_RECEIPTS = requestActions('client/CLIENT_RECEIPTS');
export const CLIENT_RECEIPT = requestActions('client/CLIENT_RECEIPT');
export const UPDATE_IBAN = requestActions('client/UPDATE_IBAN');
export const UPDATE_CONTRACT = requestActions('client/UPDATE_CONTRACT');
export const CLIENT_UPDATE_RECEIPT = requestActions(
  'client/CLIENT_UPDATE_RECEIPT'
);

// Client
export const CLIENT = {
  RESET: 'client/RESET',
  GET: requestActions('client/GET'),
  UPDATE: requestActions('client/UPDATE'),
  GET_IMAGES: requestActions('client/GET_IMAGES'),
  GET_CO_IMAGES: requestActions('client/GET_CO_IMAGES'),
  UPDATE_IMAGES: requestActions('client/UPDATE_IMAGES'),
  COMMUNICATIONS: requestActions('client/COMMUNICATIONS'),
  COMMUNICATION: requestActions('client/COMMUNICATION'),
  SEND_COMMUNICATION: requestActions('client/SEND_COMMUNICATION'),
  SEND_EMAIL_COMMUNICATION: requestActions('client/SEND_EMAIL_COMMUNICATION'),
  SEND_SMS_COMMUNICATION: requestActions('client/SEND_SMS_COMMUNICATION'),
  CONTRACTS: requestActions('client/CONTRACTS'),
  CONTRACT: requestActions('client/CONTRACT'),
  RECEIPTS: requestActions('client/RECEIPTS'),
  RECEIPT: requestActions('client/RECEIPT'),
  UPDATE_IBAN: requestActions('client/UPDATE_IBAN'),
  UPDATE_CONTRACT: requestActions('client/UPDATE_CONTRACT'),
  UPDATE_RECEIPT: requestActions('client/UPDATE_RECEIPT'),
  DOWNLOAD_CONTRACT: requestActions('client/DOWNLOAD_CONTRACT'),
  PRESCRIBER: requestActions('client/PRESCRIBER'),
  GET_RECOVERY: requestActions('client/GET_RECOVERY'),
  SAVE_RECOVERY: requestActions('client/SAVE_RECOVERY'),
  UPDATE_RECOVERIES: requestActions('client/UPDATE_RECOVERIES'),
  SEND_TO_JUDICIAL: requestActions('client/SEND_TO_JUDICIAL'),
  GET_CONTACT_INFO: requestActions('client/GET_CONTACT_INFO'),
  SET_CONTACT_INFO: requestActions('client/SET_CONTACT_INFO'),
  SEND_AMORTIZATION_TABLE: requestActions('client/SEND_AMORTIZATION_TABLE'),
  REFINANCED: requestActions('client/REFINANCED'),
  DOWNLOAD_UNPAIDS: requestActions('client/DOWNLOAD_UNPAIDS'),
};

// Recover
export const GET_RECOVERIES = requestActions('recover/GET_RECOVERIES');
export const RECOVER_GET_CLIENTS = requestActions(
  'recover/RECOVER_GET_CLIENTS'
);
export const RECOVER_CALENDAR = requestActions('recover/RECOVER_CALENDAR');
export const RECOVER_GET_WALLET = requestActions('recover/RECOVER_GET_WALLET');
export const RECOVER_JUDICIAL = requestActions('recover/RECOVER_JUDICIAL');
export const UPDATE_RECOVERY_EMAIL_LIST = requestActions(
  'recover/UPDATE_RECOVERY_EMAIL_LIST'
);
export const SEND_RECOVERY_EMAIL_LIST = requestActions(
  'recover/SEND_RECOVERY_EMAIL_LIST'
);

// Returns
export const RETURNS_GET_DATA = requestActions('returns/RETURNS_GET_DATA');

// Lots
export const SEARCH_LOT = requestActions('lot/SEARCH_LOT');
export const SEARCH_LOTS = requestActions('lots/SEARCH_LOTS');
export const LOT_TRANSFERS = requestActions('lots/LOT_TRANSFERS');
export const SET_OPERATION_COD = requestActions('lots/SET_OPERATION_COD');
export const GET_LOTS = requestActions('lots/GET_LOTS');

// Reunifications
export const GET_REUNIFICATION_LIST = requestActions(
  'reunifications/GET_REUNIFICATION_LIST'
);
export const GET_REUNIFICATION_LOANS = requestActions(
  'reunification/GET_REUNIFICATION_LOANS'
);
export const GET_REUNIFICATION_LOANS_AMOUNT = requestActions(
  'reunification/GET_REUNIFICATION_LOANS_AMOUNT'
);
export const GET_ENTITIES_LIST = requestActions(
  'reunification/GET_ENTITIES_LIST'
);
export const SET_REUNIFICATION_DATA = requestActions(
  'reunification/SET_REUNIFICATION_DATA'
);
export const UPDATE_REUNIFICATION = requestActions(
  'reunification/UPDATE_REUNIFICATION'
);
export const HANDLE_REUNIFICATION_STATUS = requestActions(
  'reunification/HANDLE_REUNIFICATION_STATUS'
);
export const UPDATE_CERT_FILE = requestActions(
  'reunification/UPDATE_CERT_FILE'
);
export const DELETE_REUNIFICATION_LOAN = requestActions(
  'reunification/DELETE_REUNIFICATION_LOAN'
);

// REMMITANCES
export const DOWNLOAD_REMITTANCES = requestActions(
  '/remittances/DOWNLOAD_REMITTANCES'
);
export const SEARCH_REMITTANCES = requestActions(
  'remittances/SEARCH_REMITTANCES'
);
export const SEARCH_REMITTANCE = requestActions(
  'remittances/SEARCH_REMITTANCE'
);
export const RECEIPTS_CLEAR = requestActions('remittances/RECEIPTS_CLEAR');

// USER
export const SET_USER_PERMISSIONS = requestActions('user/SET_USER_PERMISSIONS');
export const GET_USER = requestActions('user/GET_USER');
export const SET_USER = requestActions('user/SET_USER');
export const GET_USER_ROLES = requestActions('user/GET_USER_ROLES');
export const CREATE_USER = requestActions('user/CREATE_USER');
export const EDIT_USER = requestActions('user/EDIT_USER');
export const RESET_PASSWORD = requestActions('user/RESET_PASSWORD');
export const GET_ROLE_PERMISSION = requestActions('user/GET_ROLE_PERMISSION');
export const UPDATE_ROLE_PERMISSION = requestActions(
  'user/UPDATE_ROLE_PERMISSION'
);

// Permission
export const GET_PERMISSION_LIST = requestActions(
  'permissions/GET_PERMISSION_LIST'
);

export const DOWNLOAD_LOTS = requestActions('lots/DOWNLOAD_LOTS');

// History Tab
export const ADD_HISTORY_TAB = 'ADD_HISTORY_TAB';
export const REMOVE_HISTORY_TAB = 'REMOVE_HISTORY_TAB';
