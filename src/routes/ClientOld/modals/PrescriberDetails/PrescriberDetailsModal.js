import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {actions} from '../../modules/actions';
import {Modal, Button, Panel} from 'react-bootstrap';

import FontAwesome from 'react-fontawesome';

const PrescriberDetailsModal = memo(function PrescriberDetailsModal({
  close,
  prescriber,
  show,
  className,
}) {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Detalle Prescriptor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Panel header="Zank" className={className}>
          <div className="nera_data">
            <div className="data_row">
              <span className="data_title">Activo:</span>
              <span className="data_content">
                {prescriber.get('active') ? (
                  <FontAwesome name="check-circle" />
                ) : (
                  <FontAwesome name="ban" />
                )}
              </span>
            </div>
            <div className="data_row">
              <span className="data_title">Nombre:</span>
              <span className="data_content">{prescriber.get('name')}</span>
            </div>

            <div className="data_row">
              <span className="data_title">Dirección:</span>
              <span className="data_content">{prescriber.get('address')}</span>
            </div>

            <div className="data_row">
              <span className="data_title">Teléfono:</span>
              <span className="data_content">{prescriber.get('phone')}</span>
            </div>

            <div className="data_row">
              <span className="data_title">NIF:</span>
              <span className="data_content">{prescriber.get('nif')}</span>
            </div>

            <div className="data_row">
              <span className="data_title">IBAN:</span>
              <span className="data_content">{prescriber.get('iban')}</span>
            </div>

            <div className="data_row">
              <span className="data_title">Sector:</span>
              <span className="data_content">{prescriber.get('sector')}</span>
            </div>

            <div className="data_row">
              <span className="data_title">Destino:</span>
              <span className="data_content">
                Pendiente de recibir de backend
              </span>
            </div>
          </div>
        </Panel>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger" onClick={close}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

PrescriberDetailsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  prescriber: PropTypes.object.isRequired,
};

const mapStateToProps = ({client}) => ({
  prescriber: client.get('prescriber'),
});

const mapDispatchToProps = {...actions};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrescriberDetailsModal);
