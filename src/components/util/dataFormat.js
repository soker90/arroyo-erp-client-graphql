import moment from 'moment';
import accounting from 'accounting';
import React from 'react';
import FA from 'react-fontawesome';

const CONTRACT_STATUSES = {
  con_req: 'Cliente creado y datos simulados',
  con_gen: 'Contrato generado',
  con_sig: 'Contrato firmado',
  con_env: 'Abono generado',
  con_act: 'Contrato activo',
  con_fin: 'Finalizado',
  con_val: 'Contrato validado',
  con_ref: 'Contrato rechazado',
  con_amo: 'Amortizado',
};

moment.locale('es');

const contractStatus = status =>
  CONTRACT_STATUSES[status] || `No válido (${status})`;

const date = cell => moment(cell).format('DD/MM/YYYY HH:mm');

const age = cell => {
  if (!cell) return 'NaN';
  return moment().diff(cell, 'years');
};

const dateDia = cell => moment(cell).format('DD/MM HH:mm');

const dateText = cell => moment(cell).format('DD MMM YYYY');

const dateLong = cell => moment(cell).format('LLL');

const dateShort = cell => (cell ? moment(cell).format('DD/MM/YYYY') : 'N/D');

const bool = cell => {
  if (typeof cell === undefined || cell === null) return 'null';
  return cell ? 'Sí' : 'No';
};

const euro = cell => {
  let _cell = String(accounting.formatMoney(Number(cell), '', 2, '.', ','));
  const _end = _cell.substring(_cell.length - 3, _cell.length);
  _cell = _end === ',00' ? _cell.substring(0, _cell.length - 3) : _cell;
  return `${_cell} €`;
};

const number = cell => {
  let _cell = String(accounting.formatMoney(Number(cell), '', 2, '.', ','));
  const _end = _cell.substring(_cell.length - 3, _cell.length);
  _cell = _end === ',00' ? _cell.substring(0, _cell.length - 3) : _cell;
  return `${_cell}`;
};

const percent = cell => {
  if (cell === 'NaN' || cell === null ) return '0 %';
  return `${cell} %`;
};

const prosp = cell => cell.substring(0, 5);

const firstWord = str => {
  if (str.indexOf(' ') === -1) {
    return str;
  }
  return str.substr(0, str.indexOf(' '));
};

const status = cell => {
  switch (cell) {
    case 'Aprobado':
      return (
        <div>
          &nbsp;
          <FA name="circle" />
          &nbsp;
        </div>
      );
    case 'Pte. Fintonic':
    case 'Pte. wanna':
    case 'Pte. Usuario':
      return (
        <div>
          &nbsp;
          <FA name="circle" />
          &nbsp;
        </div>
      );
    default:
      return (
        <div>
          &nbsp;
          <FA name="circle" />
          &nbsp;
        </div>
      );
  }
};

const statusNull = cell => {
  if (cell === 'null') {
    return 'Sin estudiar';
  }
  return cell;
};

const nameNull = cell => {
  if (cell === 'null') {
    return '(Sin nombre)';
  }
  return cell;
};

const sortNumber = (a, b) =>
  parseInt(a.client_id, 10) - parseInt(b.client_id, 10);

const createMarkup = html => ({__html: html});

export default {
  date,
  age,
  dateDia,
  dateShort,
  dateText,
  dateLong,
  bool,
  euro,
  prosp,
  status,
  statusNull,
  nameNull,
  firstWord,
  percent,
  sortNumber,
  number,
  createMarkup,
  contractStatus,
};
