import React, {Fragment, memo} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';

import {useStyles} from './PaymentButtons.styles';

const PaymentButtons = memo(({show, showModalSendJudicial, clientId, showModalPaymentStatus}) => {
  const classes = useStyles();
  /**
   * Handle for abogado button
   * @private
   */
  const _handleAbogadoButton = () => {
    showModalSendJudicial();
  };

  const _handleModifyButton = () => {
    showModalPaymentStatus();
  };

  /**
   * If !show don't render
   */
  if (!show) return null;

  return (
    <Fragment>
      <Button
        color="secondary"
        onClick={_handleModifyButton}
        variant="contained"
      >
        <EditIcon className={classes.icon}/>
        Modificar
      </Button>
      <Button
        onClick={_handleAbogadoButton}
        className={classes.dangerButton}
        type='submit'
        variant='contained'
      >
        <SendIcon
          className={classes.icon}
        />
        Enviar a abogado
      </Button>
    </Fragment>
  )
    ;
});

PaymentButtons.propTypes = {
  show: PropTypes.bool.isRequired,
  showModalSendJudicial: PropTypes.func.isRequired,
  clientId: PropTypes.number.isRequired,
  showModalPaymentStatus: PropTypes.func.isRequired,
};

PaymentButtons.displayName = 'PaymentButtons';

export default PaymentButtons;
