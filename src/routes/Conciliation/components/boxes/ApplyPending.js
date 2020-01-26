import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Col} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import dataFormat from 'components/util/dataFormat';
import {getPendingIncomes} from '../../modules/conciliation';

const incomesTableProperties = {
  striped: true,
  hover: true,
  condensed: true,
  height: '300',
};

const ApplyPending = memo(({
                           getPendingIncomes,
                           pendingIncomes,
                         }) => {
  useEffect(() => {
    getPendingIncomes();
  }, [getPendingIncomes]);

  return (
    <Col xs={12} sm={12} md={12}>
      <label>Pendientes de aplicar ({pendingIncomes.length})</label>
      <BootstrapTable data={pendingIncomes} {...incomesTableProperties}>
        <TableHeaderColumn dataField="incomeId" dataSort isKey>
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="importe"
          dataSort
          dataFormat={dataFormat.euro}
        >
          Importe
        </TableHeaderColumn>
        <TableHeaderColumn dataField="pagador" dataSort>
          Pagador
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="fechaOperacion"
          dataSort
          dataFormat={dataFormat.dateShort}
        >
          Fecha operación
        </TableHeaderColumn>
      </BootstrapTable>
    </Col>
  );
});

ApplyPending.propTypes = {
  pendingIncomes: PropTypes.array.isRequired,
  getPendingIncomes: PropTypes.func.isRequired,
};

ApplyPending.displayName = 'ApplyPending';

const mapStateToProps = ({conciliation}) => ({
  pendingIncomes: conciliation.pendingIncomes,
});

export default connect(
  mapStateToProps,
  {getPendingIncomes}
)(ApplyPending);
