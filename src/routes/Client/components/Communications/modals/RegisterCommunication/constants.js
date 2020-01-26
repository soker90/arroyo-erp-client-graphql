/**
 * Listado de posibles motivos de la comunicación
 * @type {string[]}
 */
export const subjects = [
  '',
  'Rescate',
  'Amortización',
  'Consulta',
  'Info general',
  'Cuando recibiré mi dinero',
  'Contraseña Área Cliente',
  'Impagos',
  'Acreditia gestiones',
  'Documentación Recibida',
  'Nuevo préstamo Solicitud',
  'Reclamación',
  'LOPD',
  'Cambio de IBAN',
  'Cambios Datos personales',
  'Rescate solicitud Dni',
  'Rescate solicitud justificante iban',
  'Rescate envío de contrato',
  'Préstamo on line',
  'Contrato doble firma',
  'Amazon',
  'Amazon desistimiento',
  'Desistimiento',
];

/**
 * Posibles direcciones de la comunicacion
 * @type {string[][]}
 */
export const directionTypes = [
  ['I', 'Recibida'],
  ['O', 'Enviada'],
];

/**
 * Posibles medios de comunicacion
 * @type {string[]}
 */
export const communicationTypes = [
  ['Email', 'Correo electrónico'],
  ['Llamada', 'Llamada'],
];