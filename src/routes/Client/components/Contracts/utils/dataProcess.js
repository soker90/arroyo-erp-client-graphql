import format from 'components/util/dataFormat';

/**
 * Get openFee
 * @param {number} openFee
 * @param {number} amount
 * @returns {number}
 * @private
 */
const _getOpenFee = ({openFee, amount}) => (openFee * amount) / 100;

/**
 * Get studyFee
 * @param {number} studyFee
 * @param {number} amount
 * @returns {number}
 * @private
 */
const _getStudyFee = ({studyFee, amount}) => (studyFee * amount) / 100;

/**
 * Get arrearsFee
 * @param {number} arrearsFee
 * @param {number} amount
 * @returns {number}
 * @private
 */
const _gtArrearsFee = ({arrearsFee, amount}) => (arrearsFee * amount) / 100;

/**
 * Get prescriberOpenFee
 * @param {number} prescriberOpenFee
 * @param {number} amount
 * @returns {number}
 * @private
 */
const _getPrescriberOpenFee = ({prescriberOpenFee, amount}) => (prescriberOpenFee * amount) / 100;

/**
 * Prepare data for draw in component
 * @param contract
 * @returns {[[[string, string], [string, string], [string, string], [string, string]], [[string, *], [string, *], [string, *], [string, *]], [[string, string], [string, string], [string, string], [string, string]]]}
 */
export const dataProcess = contract => {
  return [[
    ['TIN', format.percent(contract.tin)],
    ['TAE Lender', format.percent(contract.tae)],
    ['TAE Cliente', format.percent(contract.taeClient)],
    ['Plazo', `${
      contract.duration
    } meses`],
  ],
    [
      ['Recibos al día', contract.receiptDay],
      ['Recibos abonados', contract.receiptPay],
      ['Recibos devueltos', contract.receiptRet],
      ['Recibos pendientes', contract.receiptPen],
    ],
    [
      ['Comisión apertura', `${contract.openFee}% - ${_getOpenFee(contract)}€`],
      ['Comisión estudio', `${contract.studyFee || 0}% - ${_getStudyFee(contract)}€`],
      ['Comisión prestatario', `${contract.arrearsFee || 0}% - ${_gtArrearsFee(contract)}€`],
      ['Comisión afiliado', `${contract.prescriberOpenFee || 0}% - ${_getPrescriberOpenFee(contract)}€`],
    ]];
};
