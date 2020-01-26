export const CERT_FILE_TEMPLATE = {
  debtCert: 15,
  paymentLetter: 14,
};

export const entitiesList = [
  'ING',
  'BBVA',
  'CETELEM',
  'BANKINTER',
  'SANTANDER',
  'WANNA',
];

export const STATUS_MESSAGES = {
  SUCCESS: 'Se ha validado',
  REJECTED_DOCS: 'Se ha rechazado por documentación',
  REJECTED_RISK: 'Se ha rechazado por riesgo',
  DESISTED: 'Se ha desistido',
};

export const REUNIFICATION_STATUS_TEMPLATES = {
  SUCCESS: 'AUTOMATIC REUNIFICACION Prestamo aprobado wanna',
  REJECTED_DOCS: 'AUTOMATIC REUNIFICACION Denegacion- Falta de Documentacion',
  REJECTED_RISK: 'AUTOMATIC REUNIFICACION Denegacion- Riesgo',
  DESISTED: 'AUTOMATIC REUNIFICACION Desistimiento',
};
export const REUNIFICATION_STATUS = {
  SUCCESS: 'valid',
  REJECTED_DOCS: 'rejected',
  REJECTED_RISK: 'rejected',
  DESISTED: 'desisted',
};

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
};

export const STATUS_LIST = {
  reu_gen: 'Pendiente',
  reu_ref: 'Rechazada',
  reu_des: 'Desistida',
  reu_val: 'Aprobada',
};
