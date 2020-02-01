import {makeStyles} from '@material-ui/styles';
import {colors} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: colors.grey[300],
    marginTop: theme.spacing(2),
  },
}));
