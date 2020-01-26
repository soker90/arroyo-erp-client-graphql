import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  dangerButton: {
    color: theme.palette.white,
    backgroundColor: theme.palette.button.danger.root,
    '&:hover': {
      backgroundColor: theme.palette.button.danger.hover,
    },
  },
  neutralButton:  {
    color: theme.palette.white,
    backgroundColor: theme.palette.button.neutral.root,
    '&:hover': {
      backgroundColor: theme.palette.button.neutral.hover,
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));