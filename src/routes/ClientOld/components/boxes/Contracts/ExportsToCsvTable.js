import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import format from 'components/util/dataFormat';
import {receiptStatus} from 'utils/constants';

function formatReceiptStatus(statusCod) {
  const status = receiptStatus.find(r => r.value === statusCod);
  return status ? status.text : 'Sin estado';
}

function showTitulizated(titulizated) {
  return !titulizated ? 'No' : 'Si';
}

export default ({data, receiptsTableProps}) => (
  <BootstrapTable data={data} {...receiptsTableProps}>
    <TableHeaderColumn dataField='Pago' dataSort dataAlign='right'>
      Nº
    </TableHeaderColumn>
    <TableHeaderColumn dataField='Recibo' isKey dataSort dataAlign='right'>
      Código
    </TableHeaderColumn>
    <TableHeaderColumn
      dataField='Importe'
      dataSort
      dataAlign='right'
      dataFormat={format.euro}
    >
      Importe
    </TableHeaderColumn>
    <TableHeaderColumn
      dataField='Capital'
      dataSort
      dataAlign='right'
      dataFormat={format.euro}
    >
      Capital
    </TableHeaderColumn>
    <TableHeaderColumn
      dataField='Interes'
      dataSort
      dataAlign='right'
      dataFormat={format.euro}
    >
      Interés
    </TableHeaderColumn>
    <TableHeaderColumn
      dataField='Capital Pendiente'
      dataSort
      dataAlign='right'
      dataFormat={format.euro}
    >
      Capital pendiente
    </TableHeaderColumn>
    <TableHeaderColumn
      dataField='Vencimiento'
      dataSort
      dataAlign='center'
      dataFormat={format.dateShort}
    >
      Vencimiento
    </TableHeaderColumn>
    <TableHeaderColumn
      dataField='Estado'
      dataSort
      dataAlign='center'
      dataFormat={formatReceiptStatus}
    >
      Estado
    </TableHeaderColumn>
    <TableHeaderColumn
      dataField='Fecha Abono'
      dataSort
      dataAlign='center'
      dataFormat={format.dateShort}
    >
      Fecha Abono
    </TableHeaderColumn>
    <TableHeaderColumn
      dataField='Titulizado'
      dataSort
      dataAlign='center'
      dataFormat={showTitulizated}
    >
      Titulizado
    </TableHeaderColumn>
  </BootstrapTable>
);
