import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  root: {},
  searchButton: {
    color: theme.palette.white,
    backgroundColor: theme.palette.button.success.root,
    '&:hover': {
      backgroundColor: theme.palette.button.success.hover,
    },
    marginRight: '1rem',
  },
  cleanButton: {
    color: theme.palette.white,
    backgroundColor: theme.palette.button.neutral.root,
    '&:hover': {
      backgroundColor: theme.palette.button.neutral.hover,
    },
  },
}));