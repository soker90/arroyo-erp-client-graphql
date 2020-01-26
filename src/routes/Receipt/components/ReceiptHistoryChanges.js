import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import format from 'components/util/dataFormat';
import {getReceiptStatus} from '../utils';
import InfoPanel from 'components/InfoPanel';

const ReceiptHistoryChanges = memo(({receiptHis}) => {
  /**
   * Render column header of the table
   * @param {string} literal
   * @param {string} dataField
   * @param {function} dataFormat
   * @return {TableHeaderColumn}
   * @private
   */
  const _renderHeaderColumn = (literal, dataField, dataFormat) =>
    <TableHeaderColumn
      dataField={dataField}
      dataSort
      dataFormat={dataFormat}
      dataAlign="right"
    >{literal}
    </TableHeaderColumn>;

  return <InfoPanel xs={12} static title="Histórico de cambios">
    <BootstrapTable data={receiptHis || []} striped condensed>
      <TableHeaderColumn dataField="hisId" hidden isKey>
        hisId
      </TableHeaderColumn>
      {_renderHeaderColumn('Número pago', 'paymentNumber')}
      {_renderHeaderColumn('Fecha vencimiento', 'maturityDate', format.dateShort)}
      {_renderHeaderColumn('Amortización', 'amortisation', format.euro)}
      {_renderHeaderColumn('Intereses', 'interestAmount', format.euro)}
      {_renderHeaderColumn('Importe total', 'receiptAmount', format.euro)}
      {_renderHeaderColumn('Capital pendiente', 'pendingCapital', format.euro)}
      {_renderHeaderColumn('Fecha abono', 'paymentDate', format.dateShort)}
      {_renderHeaderColumn('Fecha modificación', 'modDate', format.date)}
      {_renderHeaderColumn('Estado', 'statusCod', getReceiptStatus)}
    </BootstrapTable>
  </InfoPanel>;
});


ReceiptHistoryChanges.protoType = {
  receiptHis: PropTypes.object,
};

export default ReceiptHistoryChanges;
