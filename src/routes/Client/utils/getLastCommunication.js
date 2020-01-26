import dataFormat from 'components/util/dataFormat';

/**
 * Return the date of the las communication
 * @param {array} communications
 * @return {string}
 */
export const getLastCommunication = communications => {
  const lastCommunication =
    (communications?.length > 0) ?
      communications[0].dateComunication:
      Date.now();
  return dataFormat.date(lastCommunication);
};
