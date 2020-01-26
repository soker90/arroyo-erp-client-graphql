import {makeStyles} from '@material-ui/styles';
import image from '../../../assets/login.jpg';

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
  grid: {
    height: '100%',
  },
  imageContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  image: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px',
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300,
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white,
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
}));
