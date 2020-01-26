import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Panel} from 'react-bootstrap';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import dataFormat from 'components/util/dataFormat';

const ContractPanel = memo(function ContractPanel({setContract, contracts}) {
  const contractsTableProps = {
    striped: true,
    hover: true,
    condensed: true,
    trClassName: 'cursor-pointer',
    selectRow: {
      mode: 'radio',
      clickToSelect: true,
      className: 'row-selected',
      onSelect: row => setContract(row),
    },
  };

  return (
    <Panel header="Contratos">
      <BootstrapTable data={contracts} {...contractsTableProps}>
        <TableHeaderColumn dataField="codContract" isKey>
          Código contrato
        </TableHeaderColumn>
        <TableHeaderColumn dataField="amount" dataFormat={dataFormat.euro}>
          Capital
        </TableHeaderColumn>
        <TableHeaderColumn dataField="amountTotal" dataFormat={dataFormat.euro}>
          Importe total
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="pendingCapital"
          dataFormat={dataFormat.euro}
        >
          Capital pendiente
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="tsSignaturedDate"
          dataFormat={dataFormat.date}
        >
          Fecha de firma
        </TableHeaderColumn>
      </BootstrapTable>
    </Panel>
  );
});

ContractPanel.propTypes = {
  contracts: PropTypes.array.isRequired,
  setContract: PropTypes.func.isRequired,
};

export default ContractPanel;
