/**
 * Return if the lot have associated movements
 * @param {number || null} amortisationSum
 * @param {number || null}interestSum
 * @param {number || null} potiveSum
 * @param {number || null} negativeSum
 * @returns {boolean}
 */
export const haveMovements = ({amortisationSum, interestSum, potiveSum, negativeSum}) =>
  amortisationSum !== undefined;