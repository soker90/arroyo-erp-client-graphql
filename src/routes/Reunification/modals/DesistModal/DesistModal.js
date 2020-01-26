import React           from 'react';
import PropTypes       from 'prop-types';
import {connect}       from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import {actions}       from '../../modules/reunification';

const {
  REUNIFICATION_STATUS,
  REUNIFICATION_STATUS_TEMPLATES,
} = require('../../modules/constants');

const DesistModal = ({
  show,
  close,
  reunificationId,
  handleReunificationStatus,
  tab,
}) => {
  const updateReunificationStatus = () => {
    handleReunificationStatus({
      reunificationId,
      statusCod: REUNIFICATION_STATUS.DESISTED,
      templateShortDescription: REUNIFICATION_STATUS_TEMPLATES.DESISTED,
      closeTab: tab,
    }, close);
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Desistir Reunificación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          ¿ Estás seguro/a de que quieres desistir ? Los datos serán borrados y
          no se podrán recuperar.
        </h4>
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

DesistModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  reunificationId: PropTypes.number.isRequired,
  handleReunificationStatus: PropTypes.func.isRequired,
};

export default connect(
  null,
  {...actions}
)(DesistModal);
