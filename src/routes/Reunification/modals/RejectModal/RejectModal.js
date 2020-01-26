import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import {actions} from '../../modules/reunification';

const {
  REUNIFICATION_STATUS,
  REUNIFICATION_STATUS_TEMPLATES,
} = require('../../modules/constants');

const RejectModal = ({
  show,
  close,
  reunificationId,
  handleReunificationStatus,
}) => {
  const rejectDocs = () => {
    handleReunificationStatus({
      reunificationId,
      statusCod: REUNIFICATION_STATUS.REJECTED_DOCS,
      templateShortDescription: REUNIFICATION_STATUS_TEMPLATES.REJECTED_DOCS,
    });
  };
  const rejectRisk = () => {
    handleReunificationStatus({
      reunificationId,
      statusCod: REUNIFICATION_STATUS.REJECTED_RISK,
      templateShortDescription: REUNIFICATION_STATUS_TEMPLATES.REJECTED_RISK,
    });
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Rechazar Reunificación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button bsStyle="primary" onClick={rejectRisk}>
          Rechazar por Riesgo
        </Button>
        <Button bsStyle="primary" onClick={rejectDocs}>
          Rechazar por Documentación
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger" onClick={close}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

RejectModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  reunificationId: PropTypes.number.isRequired,
  handleReunificationStatus: PropTypes.func.isRequired,
};

export default connect(
  null,
  {...actions}
)(RejectModal);
