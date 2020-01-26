import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';

const ConfirmationModal = ({show, close, importe, clientId, applyPayment}) => {
  function handleApplyPayment() {
    close();
    applyPayment();
  }
  return (
    <Modal show={show} onHide={close} bsSize="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Confirmación de aplicación de pago al cliente {clientId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          ¿Estás seguro/a de querer aplicar el pago de: {importe} € al cliente:{' '}
          {clientId}
        </h4>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger" onClick={handleApplyPayment}>
          Confirmar
        </Button>
        <Button bsStyle="danger" onClick={close}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  importe: PropTypes.number.isRequired,
  clientId: PropTypes.number.isRequired,
};

export default ConfirmationModal;
