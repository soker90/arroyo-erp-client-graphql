import React, {memo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import dataFormat from 'components/util/dataFormat';

const communicationStyle = {
  height: '300px',
  maxHeight: '300px',
  minHeight: '300px',
  overflowY: 'scroll',
};

const ClientCommunicationsModal = memo(({show, getClientCommunications, clientId, close, communications}) =>{
  const [communication, setCommunication] = useState(null);

  const _handleRowClick = row => {
    setCommunication(row);
  };

  const _communicationTableProps = {
    striped: true,
    hover: true,
    condensed: true,
    trClassName: 'cursor-pointer',
    height: 200,
    text: null,
    options: {
      sortName: 'dateComunication',
      sortOrder: 'desc',
    },
    selectRow: {
      mode: 'radio',
      clickToSelect: true,
      className: 'row-selected',
      onSelect: _handleRowClick,
    },
  };

  useEffect(() => {
    if (show) {
      setCommunication(null);
      _getClientCommunications();
    }
    //eslint-disable-next-line
  }, [show]);

  const _getClientCommunications = () => {
    getClientCommunications(clientId);
  };

    const _html = dataFormat.createMarkup(communication?.text || '');

    return (
      <Modal show={show} onHide={close} bsSize="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Comunicaciones del cliente {clientId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BootstrapTable
            data={communications}
            {..._communicationTableProps}
          >
            <TableHeaderColumn dataField="clientComunicationId" isKey>
              ID
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="dateComunication"
              dataFormat={dataFormat.date}
            >
              Fecha
            </TableHeaderColumn>
            <TableHeaderColumn dataField="answer" dataFormat={dataFormat.bool}>
              Responde
            </TableHeaderColumn>
            <TableHeaderColumn dataField="directionType">
              Dirección
            </TableHeaderColumn>
            <TableHeaderColumn dataField="summary">Asunto</TableHeaderColumn>
          </BootstrapTable>
          <div>
            <div dangerouslySetInnerHTML={_html} style={communicationStyle} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger" onClick={close}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
});

ClientCommunicationsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  getClientCommunications: PropTypes.func.isRequired,
  clientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  communications: PropTypes.object.isRequired,
};

export default ClientCommunicationsModal;
