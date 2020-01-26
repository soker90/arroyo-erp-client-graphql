import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '25rem',
    maxHeight: window.innerHeight / 1.5,
    backgroundColor: theme.palette.white,
    overflow: 'auto',
  },
}));