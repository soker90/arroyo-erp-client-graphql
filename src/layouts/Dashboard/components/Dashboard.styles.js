import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  topBar: {
    zIndex: 3,
    position: 'fixed',
  },
  container: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    marginTop: '4.05rem',
    minHeight: 'calc(100vh - 4.5rem)',
    // minHeight: window.innerHeight - 70,
  },
  navBar: {
    zIndex: 2,
    width: 256,
    minWidth: 256,
    flex: '0 0 auto',
  },
  content: {
    overflowY: 'auto',
    flex: '1 1 auto',
  },
}));