import format from 'components/util/dataFormat';

/**
 * Prepare data for draw in component
 * @param contract
 * @returns {[[[string, string], [string, string], [string, string], [string, string], [string, string]], [[string, string], [string, string], [string, string], [string, string], [string, string]], [[string, string], [string, string], [string, string], [string, string], [string, string]]]}
 */
export const totalsProcess = contract => {
  return [[
    ['Total a pagar', format.euro(contract.amountTotal)],
    ['Principal préstamo', format.euro(contract.amount), 'body1'],
    ['Intereses préstamo', format.euro(contract.interest), 'body1'],
    ['Principal seguro', format.euro(contract.insuranceAmount), 'body1'],
    ['Intereses seguro', format.euro(contract.insuranceInterest), 'body1'],
  ],
    [
      ['Total pagado', format.euro(
        contract.amountTotal - contract.amountTotalPending,
      )],
      ['Principal préstamo', format.euro(contract.amount - contract.amountPending), 'body1'],
      ['Intereses préstamo', format.euro(
        contract.interest - contract.interestPending,
      ), 'body1'],
      ['Principal seguro', format.euro(
        contract.insuranceAmount -
        contract.insuranceAmountPending,
      ), 'body1'],
      ['Intereses seguro', format.euro(
        contract.insuranceInterest -
        contract.insuranceInterestPending,
      ), 'body1'],
    ],
    [
      ['Total pendiente', format.euro(contract.amountTotalPending)],
      ['Principal préstamo', format.euro(contract.amountPending), 'body1'],
      ['Intereses préstamo', format.euro(contract.interestPending), 'body1'],
      ['Principal seguro', format.euro(contract.insuranceAmountPending), 'body1'],
      ['Intereses seguro', format.euro(contract.insuranceInterestPending), 'body1'],
    ]];
};
