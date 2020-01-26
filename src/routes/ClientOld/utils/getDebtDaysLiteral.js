/**
 * Return text for debtDays value
 * @param debtDays
 * @return {string}
 * @public
 */
export const getDebtDaysLiteral = ({debtDays}) => {
  const firstText = debtDays > 90 ? '+90' : debtDays;
  const lastText = debtDays > 90 ? debtDays : '';
  return `${firstText} días(${lastText})`;
};
