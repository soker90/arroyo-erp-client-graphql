import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Col} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import dataFormat from 'components/util/dataFormat';
import {getPendingTpv} from '../../modules/conciliation';

const incomesTableProperties = {
  striped: true,
  hover: true,
  condensed: true,
  height: '300',
};

const TPVPending = memo(({
  getPendingTpv,
  pendingTpv,
}) => {
  useEffect(() => {
    getPendingTpv();
  }, [getPendingTpv]);

  return (
    <Col xs={12} sm={12} md={12}>
      <label>TPV pendiente de aplicar ({pendingTpv.length})</label>
      <BootstrapTable data={pendingTpv} {...incomesTableProperties}>
        <TableHeaderColumn dataField="id" dataSort isKey>
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="clientId"
          dataSort
        >
          ClientId
        </TableHeaderColumn>
        <TableHeaderColumn dataField="amount" dataSort dataFormat={dataFormat.euro}>
          Importe
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="issuedDate"
          dataSort
          dataFormat={dataFormat.dateShort}
        >
          Fecha operación
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="transactionId"
          dataSort
        >
          Id transacción
        </TableHeaderColumn>
      </BootstrapTable>
    </Col>
  );
});

TPVPending.propTypes = {
  pendingTpv: PropTypes.array.isRequired,
  getPendingTpv: PropTypes.func.isRequired,
};

TPVPending.displayName = 'TPVPending';

const mapStateToProps = ({conciliation}) => ({
  pendingTpv: conciliation.pendingTpv,
});

export default connect(
  mapStateToProps,
  {getPendingTpv}
)(TPVPending);
