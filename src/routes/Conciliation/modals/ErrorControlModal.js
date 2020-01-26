import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import {Col, Row, Button, Modal} from 'react-bootstrap';

const dataN43 = [
  {id: 1, name: 'Nombre 1'},
  {id: 2, name: 'Nombre 2'},
  {id: 3, name: 'Nombre 3'},
];

const dataPending = [
  {id: 4, name: 'Nombre 4'},
  {id: 5, name: 'Nombre 5'},
  {id: 6, name: 'Nombre 6'},
];

const tableProperties = {
  striped: true,
  hover: true,
  condensed: true,
  trClassName: 'cursor-pointer',
  height: '300',
};

const ErrorControlModal = memo(function ErrorControlModal({
  close,
  show,
  registeredOps,
}) {
  const [selectedDataN43, setSelectedDataN43] = useState(null);
  const [selectedPending, setSelectedPending] = useState(null);

  const dataN43selectRow = {
    mode: 'radio',
    clickToSelect: true,
    className: 'row-selected',
    onSelect: row => setSelectedDataN43(row),
  };

  const dataPendingSelectRow = {
    mode: 'radio',
    clickToSelect: true,
    className: 'row-selected',
    onSelect: row => setSelectedPending(row),
  };

  console.log('ErrorControlModal');
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Datos de contacto adicionales</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={6}>
            <h4>Operaciones N43 sin conciliar</h4>
            <h4>
              <label
                className={`label label-${
                  selectedDataN43 ? 'primary' : 'danger'
                }`}
              >
                {selectedDataN43 ? selectedDataN43.name : 'no seleccionado'}
              </label>
            </h4>
            <BootstrapTable
              data={dataN43}
              selectRow={dataN43selectRow}
              {...tableProperties}
            >
              <TableHeaderColumn dataField="id" dataSort isKey>
                ID
              </TableHeaderColumn>
              <TableHeaderColumn dataField="name" dataSort>
                Name
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
          <Col xs={6}>
            <h4>Operaciones pendientes de conciliar</h4>
            <h4>
              <label
                className={`label label-${
                  selectedPending ? 'primary' : 'danger'
                }`}
              >
                {selectedPending ? selectedPending.name : 'no seleccionado'}
              </label>
            </h4>
            <BootstrapTable
              data={dataPending}
              selectRow={dataPendingSelectRow}
              {...tableProperties}
            >
              <TableHeaderColumn dataField="id" dataSort isKey>
                ID
              </TableHeaderColumn>
              <TableHeaderColumn dataField="name" dataSort>
                Name
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
          <Col xs={12}>
            <Button bsStyle="danger" className="pull-right" onClick={close}>
              Cerrar
            </Button>
            <Button
              bsStyle="primary"
              className="pull-right"
              disabled={!selectedDataN43 && !selectedPending}
            >
              Conciliación manual
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
});

ErrorControlModal.propTypes = {
  close: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  registeredOps: PropTypes.shape({
    transfers: PropTypes.shape({
      count: PropTypes.number,
      pending: PropTypes.array,
    }),
    remittances: PropTypes.shape({
      count: PropTypes.number,
      pending: PropTypes.array,
    }),
    unpaids: PropTypes.shape({
      count: PropTypes.number,
      pending: PropTypes.array,
    }),
    incomes: PropTypes.shape({
      count: PropTypes.number,
      pending: PropTypes.array,
    }),
    commisions: PropTypes.shape({
      count: PropTypes.number,
      pending: PropTypes.array,
    }),
  }),
};

export default ErrorControlModal;
