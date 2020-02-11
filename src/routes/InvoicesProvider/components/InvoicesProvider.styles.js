import {makeStyles} from '@material-ui/styles';
import {colors} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(3),
  },
  divider: {
    backgroundColor: colors.grey[300],
    marginTop: theme.spacing(3),
  },
}));