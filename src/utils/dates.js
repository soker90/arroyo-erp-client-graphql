import moment from 'moment';

export const dateShort = date => (date ? moment(Number(date)).format('DD/MM/YYYY') : 'Sin fecha');
export const dateSend = date => date ? moment(date).format('DD/MM/YYYY') : null;
