import makeStyles from '@material-ui/styles/makeStyles';
import {colors} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    paddingBottom: 0,
  },
  content: {
    paddingTop: 0,
  },
  divider: {
    backgroundColor: colors.grey[300],
  },
}));
