import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Col} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import dataFormat from 'components/util/dataFormat';
import {getPendingTransfers} from '../../modules/conciliation';

const tableProps = {
  striped: true,
  condensed: true,
  height: '300',
};

const Transfers = memo(function Transfers({
  getPendingTransfers,
  pendingTransfers,
}) {
  useEffect(() => {
    getPendingTransfers();
  }, [getPendingTransfers]);

  return (
    <Col xs={12} sm={12} md={12}>
      {/*} LEN-1961 md{7} if receipts list active */}
      <label>Transferencias ({pendingTransfers.length})</label>
      <BootstrapTable data={pendingTransfers} {...tableProps}>
        <TableHeaderColumn dataField="lotTransfersId" width="80" dataSort>
          Lote
        </TableHeaderColumn>
        <TableHeaderColumn dataField="transferId" width="50" dataSort isKey>
          ID
        </TableHeaderColumn>
        <TableHeaderColumn dataField="codTransfer" width="200" dataSort>
          Cod. Transfer
        </TableHeaderColumn>
        <TableHeaderColumn dataField="contractId" dataSort>
          Cod. Contrato
        </TableHeaderColumn>
        <TableHeaderColumn dataField="clientId" dataSort>
          Client ID
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name" dataSort>
          Nombre
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="transferAmount"
          dataSort
          dataFormat={dataFormat.euro}
        >
          Importe
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="transferDate"
          dataSort
          dataFormat={dataFormat.dateShort}
        >
          Fecha
        </TableHeaderColumn>
      </BootstrapTable>
    </Col>
  );
});

Transfers.propTypes = {
  pendingTransfers: PropTypes.array.isRequired,
  getPendingTransfers: PropTypes.func.isRequired,
};

const mapStateToProps = ({conciliation}) => ({
  pendingTransfers: conciliation.pendingTransfers,
});

export default connect(
  mapStateToProps,
  {getPendingTransfers}
)(Transfers);
