import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.white,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: theme.spacing(3, 3),
    display: 'flex',
    justifyContent: 'space-between',
  },
  receiver: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    height: 56,
    width: 56,
    marginRight: theme.spacing(2),
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(6, 3),
  },
}));