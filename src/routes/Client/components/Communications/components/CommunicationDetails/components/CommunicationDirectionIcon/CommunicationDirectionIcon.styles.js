import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  communicationMade: {
    color: theme.palette.notification.success,
  },
  communicationReceived: {
    color: theme.palette.notification.info,
  },
}));