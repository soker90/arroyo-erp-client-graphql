import {makeStyles} from '@material-ui/styles';
import {colors} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    fontSize: 16,
    fontWeight: theme.typography.fontWeightBold,
    backgroundColor: colors.red[600],
    height: 32,
    width: 32,
  },
  actions: {
    justifyContent: 'flex-end',
  },
  iconAfter: {
    marginLeft: theme.spacing(1),
  },
  tables: {
    width: '100%',
    paddingBottom: theme.spacing(3),
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    // marginLeft: theme.spacing(2),
  },
  listFirst: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(2),
  },
  pd: {
    marginLeft: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}));