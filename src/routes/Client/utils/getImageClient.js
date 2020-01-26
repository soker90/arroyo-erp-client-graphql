import AMAZON_LOGO from 'assets/logo-amazon-small.png';
import ZANK_LOGO from 'assets/logo-zank-small.png';
import {ORIGIN} from '../constants';

/**
 * Return avatar for client (En funcion del origen del cliente P3, Zank o Amazon)
 * @param {Object} prescriber
 * @param {Object} origin
 */
export const getImageClient = (prescriber, origin) => {
  if (prescriber?.prescriberId) return ZANK_LOGO;
  if (origin?.originId === ORIGIN.AMAZON) return AMAZON_LOGO;
};