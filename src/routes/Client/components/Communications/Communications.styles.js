import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '@media (max-width: 780px)': {
      '& $emailFolders, & $emailList, & $emailDetails': {
        flexBasis: '100%',
        width: '100%',
        maxWidth: 'none',
        flexShrink: '0',
        transition: 'transform .5s ease',
        transform: 'translateX(0)',
      },
    },
  },
  openFolder: {
    '@media (max-width: 780px)': {
      '& $emailFolders, & $emailList, & $emailDetails': {
        transform: 'translateX(-100%)',
      },
    },
  },
  emailFolders: {
    flexBasis: 380,
    flexShrink: 0,
    flexGrow: 0,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  emailList: {
    flexGrow: 1,
  },
  emailDetails: {
    flexGrow: 1,
  },
  alert: {
    marginTop: theme.spacing(3),
    width: '100%',
  },
}));