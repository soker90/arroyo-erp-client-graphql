import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {ConfirmModal} from 'components/Modals';

const SendPassword = memo(props => {
  /**
   * Send email to the client for change password
   * @private
   */
  const _handleSend = () => {
    props.resetPassword(
      props.close,
    );
  };

  return <ConfirmModal
    {...props}
    title='Enviar contraseña al cliente'
    description='Se va a enviar un correo electrónico al cliente para cambiar su contraseña. ¿Estás seguro?'
    action={_handleSend}
  />
});

SendPassword.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  resetPassword: PropTypes.func.isRequired,
};

SendPassword.displayName = 'SendPassword';

export default SendPassword;
