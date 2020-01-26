import React, {Fragment, memo} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import PostAddIcon from '@material-ui/icons/PostAdd';

import {useStyles} from '../PaymentButtons/PaymentButtons.styles';

const CommunicationButtons = memo(({show, showModalSendPassword, showModalRegisterCommunication}) => {
  const classes = useStyles();

  /**
   * Handle for send password to de client
   * @private
   */
  const _handleSendPassword = () => {
    showModalSendPassword();
  };

  /**
   * Handle register communication
   * @private
   */
  const _handleRegisterButton = () => {
    showModalRegisterCommunication();
  };

  /**
   * If !show don't render
   */
  if (!show) return null;

  return (
    <Fragment>
      <Button
        className={classes.dangerButton}
        onClick={_handleSendPassword}
        variant="contained"
        type='submit'
      >
        <SendIcon
          className={classes.icon}
        />
        Enviar contraseña
      </Button>
      <Button
        onClick={_handleRegisterButton}
        color="secondary"
        variant='contained'
      >
        <PostAddIcon
          className={classes.icon}
        />
        Nuevo registro
      </Button>
    </Fragment>
  )
    ;
});

CommunicationButtons.propTypes = {
  show: PropTypes.bool.isRequired,
  showModalSendPassword: PropTypes.func.isRequired,
  showModalRegisterCommunication: PropTypes.func.isRequired,
};

CommunicationButtons.displayName = 'CommunicationButtons';

export default CommunicationButtons;
