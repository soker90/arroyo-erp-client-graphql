import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
    root: {},
    nozoom: {
      height: 240,
      width: 'auto',
      '&:hover': {
        cursor: 'zoom-in',
      },
    },
    zoom: {
      width: '100%',
      height: '100%',
      zIndex: 100,
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      '&:hover': {
        cursor: 'zoom-out',
      },
    },
    noImage: {
      marginTop: theme.spacing(2),
    }
    ,
    buttonsRotate: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    }
    ,
    divider: {
      marginTop: theme.spacing(2),
    }
    ,
    buttonSave: {
      marginTop: theme.spacing(2),
    }
    ,

  }))
;