import moment from 'moment';
import accounting from 'accounting';

moment.locale('es');

const date = cell => moment(cell).format('DD/MM/YYYY HH:mm');

const dateDia = cell => moment(cell).format('DD/MM HH:mm');

const dateText = cell => moment(cell).format('DD MMM YYYY');

const dateLong = cell => moment(cell).format('LLL');

const dateShort = cell => (cell ? moment(cell).format('DD/MM/YYYY') : 'N/D');

const bool = cell => (cell ? 'Sí' : 'No');

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
  if (cell === 'NaN') return '0 %';
  return `${cell} %`;
};

const prosp = cell => cell.substring(0, 5);

const firstWord = str => {
  if (str.indexOf(' ') === -1) {
    return str;
  }
  return str.substr(0, str.indexOf(' '));
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
  dateDia,
  dateShort,
  dateText,
  dateLong,
  bool,
  euro,
  prosp,
  statusNull,
  nameNull,
  firstWord,
  percent,
  sortNumber,
  number,
  createMarkup,
};

/*
'null' amarillo
'Cancelado' no aparece
'Estudiado' en verde
*/
