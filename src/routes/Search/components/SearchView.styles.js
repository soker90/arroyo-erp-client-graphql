import {makeStyles} from '@material-ui/styles';
import {colors} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  divider: {
    backgroundColor: colors.grey[300],
    marginTop: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(3),
  },
}));