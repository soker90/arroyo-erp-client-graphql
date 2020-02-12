import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(3),
  },
  iconYes: {
    color: theme.palette.notification.success,
  },
  iconNo: {
    color: theme.palette.notification.error,
  },
}));