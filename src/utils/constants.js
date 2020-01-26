export const receiptStatus = [
  {value: 'rec_amo', text: 'Amortizado'},
  {value: 'rec_can', text: 'Cancelado'},
  {value: 'rec_day', text: 'Al día'},
  {value: 'rec_env', text: 'Enviado'},
  {value: 'rec_ini', text: 'Recibo creado'},
  {value: 'rec_iss', text: 'Emitido'},
  {value: 'rec_man', text: 'Gestion manual'},
  {value: 'rec_pay', text: 'Abonado'},
  {value: 'rec_ref', text: 'Rechazado'},
  {value: 'rec_ret', text: 'Devuelto'},
  {value: 'rec_unp', text: 'Impagado'},
  {value: 'rec_caa', text: 'Cancelado por morosidad'},
];

export const disabledStates = ['rec_env', 'rec_iss', 'rec_pay', 'rec_day'];

export const recoveryStatus = [
  {key: 'prelocated', value: 'Prelocalizado'},
  {key: 'indirect', value: 'Indirecto'},
  {key: 'no-promise', value: 'No Promesa'},
  {key: 'promise', value: 'Promesa'},
  {key: 'broken-promise', value: 'Promesa Incumplida'},
  {key: 'payment', value: 'Pago'},
  {key: 'failed', value: 'Fallido'},
  {key: 'promise-tpv', value: 'Promesa TPV'},
  {key: 'payment-tpv', value: 'Pago TPV'},
];

export const RECOVERY_STATUS = {
  prelocated: 'Prelocalizado',
  indirect: 'Indirecto',
  'no-promise': 'No Promesa',
  promise: 'Promesa',
  'broken-promise': 'Promesa Incumplida',
  payment: 'Pago',
  failed: 'Fallido',
  bankruptcy: 'Concurso Acreedores',
  'promise-tpv': 'Promesa TPV',
  'payment-tpv': 'Pago TPV',
};

export const publicRoutes = ['/', '/login'];

export const partnerCodes = ['001', '004', '005', '006'];
