import React from 'react';
import PropTypes from 'prop-types';
import browserHistory from 'redux/history';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Panel} from 'react-bootstrap';

import format from 'components/util/dataFormat';

const Table = React.memo(function Table({returned}) {
  const walletTableProps = {
    striped: true,
    hover: true,
    condensed: true,
    trClassName: 'cursor-pointer',
    height: 'auto',
    selectRow: {
      mode: 'radio',
      clickToSelect: true,
      className: 'row-selected',
      onSelect: ({clientId}) => browserHistory.push(`/app/client/${clientId}`),
      defaultSortName: 'maturityDate',
      defaultSortOrder: 'desc',
    },
  };

  return (
    <div>
      <Panel header="Recibos Devueltos">
        <BootstrapTable {...walletTableProps} data={returned}>
          <TableHeaderColumn dataField="clientId" isKey dataSort>
            Id de Cliente
          </TableHeaderColumn>
          <TableHeaderColumn dataField="codReceipt" dataSort>
            Número Recibo
          </TableHeaderColumn>
          <TableHeaderColumn dataField="hasInsurance" dataSort>
            Tiene Seguro
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="maturityDate"
            dataFormat={format.date}
            dataSort
          >
            Fecha Promesa
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="statusChange"
            dataFormat={format.date}
            dataSort
          >
            Próxima Gestión
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="receiptAmount"
            dataAlign="right"
            dataFormat={format.euro}
            dataSort
          >
            Importe
          </TableHeaderColumn>
        </BootstrapTable>
      </Panel>
    </div>
  );
});

Table.propTypes = {
  returned: PropTypes.array.isRequired,
};

export default Table;
