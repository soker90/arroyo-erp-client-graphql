import React, {memo} from 'react';
import PropTypes from 'prop-types';
import ModalBase from '../ModalBase';


const ModalCloseSaveButtons =
  ({show, close, title, children, action}) => {
    const buttons = [
      {onClick: close, value: 'Cerrar'},
      {
        color: 'primary',
        onClick: action,
        variant: 'contained',
        value: 'Guardar',
      },
    ];

    return (
      <ModalBase
        close={close}
        show={show}
        actions={buttons}
        title={title}
      >
        {children}
      </ModalBase>
    );
  };

ModalCloseSaveButtons.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  action: PropTypes.func.isRequired,
};

ModalCloseSaveButtons.displayName = 'ModalCloseSaveButtons';

export default memo(ModalCloseSaveButtons);
