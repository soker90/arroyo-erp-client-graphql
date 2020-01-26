import {colors} from '@material-ui/core';

/**
 * Devuelve el color correspondiente a la nota del cliente
 * @param score
 * @returns {String}
 */
export const getScoreColor = score => {
  const matchColor = {
    'A': colors.green[700],
    'B': colors.lightGreen[700],
    'C': colors.yellow[600],
    'D': colors.orange[700],
    'E': colors.red[800],
  };

  return matchColor[score[0]];
};