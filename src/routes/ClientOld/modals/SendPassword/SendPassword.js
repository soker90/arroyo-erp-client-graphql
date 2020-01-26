import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {actions} from '../../modules/actions';
import {Button, Modal} from 'react-bootstrap';

const SendPassword = ({close, show, resetPassword}) => {
  const handleSend = () => {
    resetPassword();
    close();
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Enviar Contraseña al cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Enviar contraseña al cliente?</p>
        <Button bsStyle="success" onClick={handleSend}>
          Sí
        </Button>
        <Button bsStyle="danger" onClick={close}>
          No
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger" onClick={close}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

SendPassword.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = {...actions};

export default connect(
  null,
  mapDispatchToProps
)(SendPassword);
