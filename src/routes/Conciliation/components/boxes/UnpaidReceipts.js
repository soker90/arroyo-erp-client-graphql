import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import dataFormat from 'components/util/dataFormat';
import {getUnpaidReceipts} from '../../modules/conciliation';

const tableProps = {
  striped: true,
  condensed: true,
  height: '300',
};

const UnpaidReceipts = memo(function UnpaidReceipts({
  getUnpaidReceipts,
  unpaidReceipts,
}) {
  useEffect(() => {
    getUnpaidReceipts();
  }, [getUnpaidReceipts]);

  return (
    <Col xs={12} sm={12} md={5}>
      <label>Recibos devueltos ({unpaidReceipts.size})</label>
      <BootstrapTable data={unpaidReceipts} {...tableProps}>
        <TableHeaderColumn dataField="receiptUnpaidId" dataSort isKey>
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="importe"
          dataSort
          dataFormat={dataFormat.euro}
        >
          Importe
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="fechaValor"
          dataSort
          dataFormat={dataFormat.dateShort}
        >
          Fecha valor
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="fechaOperacion"
          dataSort
          dataFormat={dataFormat.dateShort}
        >
          Fecha Operación
        </TableHeaderColumn>
      </BootstrapTable>
    </Col>
  );
});

UnpaidReceipts.propTypes = {
  unpaidReceipts: PropTypes.object.isRequired,
  getUnpaidReceipts: PropTypes.func.isRequired,
};

const mapStateToProps = ({conciliation}) => ({
  unpaidReceipts: conciliation.unpaidReceipts,
});

export default connect(
  mapStateToProps,
  {getUnpaidReceipts}
)(UnpaidReceipts);
