import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import dataFormat from 'components/util/dataFormat';

import {getPendingRemittances} from '../../modules/conciliation';

const tableProps = {
  striped: true,
  condensed: true,
  height: '300',
};

const PendingRemmitances = memo(function PendingRemmitances({
  getPendingRemittances,
  pendingRemittances,
}) {
  useEffect(() => {
    getPendingRemittances();
  }, [getPendingRemittances]);

  return (
    <Col xs={12}>
      <label>Remesas ({pendingRemittances.length})</label>
      <BootstrapTable data={pendingRemittances} {...tableProps}>
        <TableHeaderColumn dataField="remittanceReceiptsId" dataSort isKey>
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="generationDate"
          dataSort
          dataFormat={dataFormat.dateShort}
        >
          Fecha generación
        </TableHeaderColumn>
        <TableHeaderColumn dataField="filename" dataSort>
          Identificador
        </TableHeaderColumn>
        <TableHeaderColumn dataField="numberReceiptIncluded" dataSort>
          Número de recibos
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="totalAmount"
          dataSort
          dataFormat={dataFormat.euro}
        >
          Importe enviado
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="maturityDateReceipt"
          dataSort
          dataFormat={dataFormat.dateShort}
        >
          Fecha de vencimiento
        </TableHeaderColumn>
      </BootstrapTable>
    </Col>
  );
});

PendingRemmitances.propTypes = {
  pendingRemittances: PropTypes.array.isRequired,
  getPendingRemittances: PropTypes.func.isRequired,
};

const mapStateToProps = ({conciliation}) => ({
  pendingRemittances: conciliation.pendingRemittances,
});

export default connect(
  mapStateToProps,
  {getPendingRemittances}
)(PendingRemmitances);
