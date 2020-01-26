import createReducer from 'redux/create-reducer';
import {
  AMORTIZATION_TYPES,
  ERP_TYPES,
  EMAIL_TEMPLATES,
} from 'action-types';
import {setPayload} from 'redux/setPayload';


const INITIAL_STATE = {
  emailTemplates: [],
  contractStatus: {
    con_act: 'Activo',
    con_amo: 'Amortizado',
    con_env: 'Abono generado',
    con_fin: 'Finalizado',
    con_gen: 'Generado',
    con_ref: 'Rechazado',
    con_req: 'Cliente creado',
    con_sig: 'Firmado',
    con_val: 'Validado',
  },
  amortizationTypes: {},
  erpTypes: {},
  recoverFilter: [
    {key: ['001', '004', '005', '006'], text: 'Todas'},
    {key: ['001', '004'], text: 'Wanna'},
    {key: ['005'], text: 'Zank'},
    {key: ['006'], text: 'Amazon'},
  ],
};

const ACTION_HANLDERS = {
  [EMAIL_TEMPLATES.SET]: setPayload,
  [AMORTIZATION_TYPES.SET]: setPayload,
  [ERP_TYPES.SET]: setPayload,
};

export default createReducer(INITIAL_STATE, ACTION_HANLDERS);
