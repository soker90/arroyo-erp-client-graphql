import moment from 'moment';

export const dateShort = date => (date ? moment(Number(date)).format('DD/MM/YYYY') : 'Sin fecha');