import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {ConfirmModal} from 'components/Modals';

const SendAbogado = memo(props => {
  /**
   * Send email to the client for change password
   * @private
   */
  const _handleSend = () => {
    props.sendToJudicial(
      props.close,
    );
  };

  return <ConfirmModal
    {...props}
    title='Enviar moroso al abogado'
    description='¿Seguro que quieres enviar este cliente al abogado?'
    action={_handleSend}
  />
});

SendAbogado.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  sendToJudicial: PropTypes.func.isRequired,
};

SendAbogado.displayName = 'SendAbogado';

export default SendAbogado;
