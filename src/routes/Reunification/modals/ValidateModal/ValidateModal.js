import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import {actions} from '../../modules/reunification';

const {
  REUNIFICATION_STATUS,
  REUNIFICATION_STATUS_TEMPLATES,
} = require('../../modules/constants');

const ValidModal = ({
  show,
  close,
  reunificationId,
  handleReunificationStatus,
}) => {
  const updateReunificationStatus = () => {
    handleReunificationStatus({
      reunificationId,
      statusCod: REUNIFICATION_STATUS.SUCCESS,
      templateShortDescription: REUNIFICATION_STATUS_TEMPLATES.SUCCESS,
    });
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Validar Reunificación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>¿ Estás seguro/a de que quieres validar ?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" onClick={updateReunificationStatus}>
          Si, Estoy Seguro/a
        </Button>
        <Button bsStyle="danger" onClick={close}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ValidModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  reunificationId: PropTypes.number.isRequired,
  handleReunificationStatus: PropTypes.func.isRequired,
};

export default connect(
  null,
  {...actions}
)(ValidModal);
