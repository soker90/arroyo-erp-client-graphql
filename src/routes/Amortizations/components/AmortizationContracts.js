import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import format from 'components/util/dataFormat';

const AmortizationContracts = memo(function AmortizationContracts({
  contracts,
  contract,
  contractStatus,
  onRowSelect,
}) {
  const selectRowProp = {
    mode: 'radio',
    clickToSelect: true,
    onSelect: onRowSelect,
    className: 'row-selected',
    selected: [contract.get('contractId')],
  };

  const formatContractStatus = status => contractStatus[status] || status;

  return (
    contracts.size > 0 && (
      <div>
        <br />
        <strong>Contratos</strong>
        <BootstrapTable
          trClassName="cursor-pointer"
          data={contracts.toJS()}
          selectRow={selectRowProp}
          condensed
          hover
          striped
          responsive
          bordered
        >
          <TableHeaderColumn dataField="contractId" isKey>
            Contract ID
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="tsSignaturedDate"
            dataFormat={format.dateShort}
          >
            Fecha de firma
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="contractStatus"
            dataFormat={formatContractStatus}
          >
            Estado
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="amount"
            dataFormat={format.euro}
            dataAlign="right"
          >
            Importe
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="amountTotal"
            dataFormat={format.euro}
            dataAlign="right"
          >
            Importe total
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  );
});

AmortizationContracts.propTypes = {
  contracts: PropTypes.object.isRequired,
  contract: PropTypes.object.isRequired,
  onRowSelect: PropTypes.func.isRequired,
};

export default AmortizationContracts;
