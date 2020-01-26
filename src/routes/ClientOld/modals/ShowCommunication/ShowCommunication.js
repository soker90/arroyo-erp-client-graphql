import React, {memo, useEffect} from 'react';
import {connect} from 'react-redux';
import {Col, Row, Modal, Button} from 'react-bootstrap';
import format from 'components/util/dataFormat';

import {actions} from '../../modules/actions';

const Communication = memo(({clientComunicationId, getCommunication, communication, show, close}) => {
  useEffect(() => {
    clientComunicationId &&
    getCommunication(clientComunicationId);
  }, [clientComunicationId, getCommunication]);

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Mostrar Comunicaciones</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={12}>
            <div className="nera_data">
              <div className="data_row">
                <span className="data_title">ID:</span>
                <span className="data_content">
                    {communication.get('clientComunicationId')}
                  </span>
              </div>
              <div className="data_row">
                <span className="data_title">Tipo:</span>
                <span className="data_content">
                    {communication.get('comunicationTypeDescription')}
                  </span>
              </div>
              <div className="data_row">
                <span className="data_title">Fecha:</span>
                <span className="data_content">
                    {format.date(communication.get('dateComunication'))}
                  </span>
              </div>
              <div className="data_row">
                <span className="data_title">Asunto:</span>
                <span className="data_content">
                    {communication.get('summary')}
                  </span>
              </div>
              <div className="data_row">
                <span className="data_title">Dirección:</span>
                <span className="data_content">
                    {communication.get('directionType')}
                  </span>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: communication.get('text') || '',
              }}
              style={{
                height: '300px',
                maxHeight: '500px',
                minHeight: '300px',
                overflowY: 'scroll',
              }}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger" onClick={close}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

const mapStateToProps = ({client}) => ({
  communication: client.get('communication'),
});

const mapDispatchToProps = {...actions};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Communication);
