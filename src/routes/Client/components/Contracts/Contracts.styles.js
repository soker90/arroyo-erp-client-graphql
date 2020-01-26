import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
    contractDetail: {
      marginTop: theme.spacing(3),
    },
    progressRoot: {},
    progress: {
      margin: theme.spacing(10),
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '40%',
    },
  }))
;