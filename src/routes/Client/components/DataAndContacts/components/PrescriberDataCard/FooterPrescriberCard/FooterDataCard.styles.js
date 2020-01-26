import makeStyles from '@material-ui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 3),
  },
  dniButton: {
    marginLeft: theme.spacing(2),
  },
  editButton: {
    marginLeft: theme.spacing(1),
  },
}));