import {receiptStatus} from 'utils/constants';

/**
 * Get literal status for the status code
 * @param {string} statusCode
 * @return {string}
 */
export const getReceiptStatus = statusCode => {
  const statusLiteral = receiptStatus.find(status => status.value === statusCode);
  return statusLiteral?.text || '---';
};
