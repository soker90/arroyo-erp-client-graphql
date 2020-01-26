import capitalize from 'react-bootstrap/lib/utils/capitalize';

/**
 * If name have the format name.surname return [Name Surname] else return same name
 * @param {string} name
 * @returns {string}
 */
export const formatName = name => name?.split('.').reduce((name, surname) => `${capitalize(name)} ${capitalize(surname)}`);