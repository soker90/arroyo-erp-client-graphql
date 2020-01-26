import moment from 'moment';

/**
 * Return the date of the las communication
 * @param {array} communications
 * @return {string}
 */
export const getLastCommunication = communications => {
  const lastCommunication =
    (communications.length > 0) ?
      communications[0].dateComunication:
      Date.now();
  return moment(lastCommunication).format(
    'DD-MM-YYYY HH:mm',
  );
};
