import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    overflowY: 'auto',
  },
  content: {
    padding: theme.spacing(2),
  },
  name: {
    marginTop: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  navigation: {
    marginTop: theme.spacing(2),
  },
}));
