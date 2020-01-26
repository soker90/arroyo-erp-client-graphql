import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  button: {
    justifyContent: 'space-between',
    textTransform: 'none',
    letterSpacing: 0,
    fontWeight: theme.typography.fontWeightRegular,
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.icon,
  },
  active: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.primary.main,
    '& icon': {
      color: theme.palette.primary.main,
    },
  },
  iconLabel: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}));