import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`,
      },
    },
  },
  valueContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));