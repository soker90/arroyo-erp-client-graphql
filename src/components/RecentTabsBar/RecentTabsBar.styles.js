import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  drawer: {
    width: 280,
  },
  root: {
    backgroundColor: theme.palette.common.white,
  },
  list: {
    padding: theme.spacing(1, 3),
  },
  listItemText: {
    marginRight: theme.spacing(1),
  },
  lastActivity: {
    whiteSpace: 'nowrap',
  },
  listItem: {
    marginLeft: theme.spacing(2),
  },
}));
