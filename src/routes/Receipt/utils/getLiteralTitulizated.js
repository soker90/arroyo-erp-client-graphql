/**
 * Return literal for receipt titulizated
 * @param {boolean | undefined | null} titulizated
 * @return {string}
 */
export const getLiteralTitulizated = ({titulizated}) => !titulizated ? '' : '(Titulizado)';
