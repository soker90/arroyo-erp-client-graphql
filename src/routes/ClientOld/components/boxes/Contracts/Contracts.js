import React, {memo, useEffect, useState} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Panel} from 'react-bootstrap';
import format from 'components/util/dataFormat';

import ContractDetails from './ContractDetails';

const Contracts = memo(({clientId, contracts, getClientContracts, getContract, getReceipts, getPrescriber}) => {
  const [selectedContractId, setSelectedContractId] = useState([]);
  useEffect(() => {
    clientId && getClientContracts(clientId);
    setSelectedContractId([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  const contractTableProps = {
    trClassName: 'cursor-pointer',
    striped: true,
    condensed: true,
    pagination: true,
    ignoreSinglePage: true,
  };

  const setContract = contractId => {
    if (contractId) {
      setSelectedContractId([contractId]);
      getContractData(contractId);
    }
  };

  useEffect(() => {
    if (selectedContractId.length === 0 && contracts.toJS().length > 0) {
      setContract(contracts?.toJS()?.[0]?.contractId);
    }

    const contractIds = contracts.toJS().map(c => c.contractId);
    if (contractIds.includes(selectedContractId[0])) {
      const [contractId] = selectedContractId;
      setContract(contractId);
    }

    setContract(contractIds[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contracts]);

  const getContractData = contractId => {
    getContract(contractId);
    getReceipts(contractId);
    getPrescriber(contractId);
  };

  const onSelect = row => {
    if (row.contractId) {
      setContract(row.contractId);
    }
  };

  const getContractTableProps = () => {
    return {
      ...contractTableProps,
      selectRow: {
        className: 'row-selected',
        mode: 'radio',
        clickToSelect: true,
        onSelect: onSelect,
        selected: selectedContractId,
      },
    };
  };

  return (
    <Panel header="Contratos" className="box-contracts">
      <BootstrapTable {...getContractTableProps()} data={contracts.toJS()}>
        <TableHeaderColumn dataField="contractId" isKey dataSort>
          ID
        </TableHeaderColumn>
        <TableHeaderColumn dataField="origin" dataSort dataFormat={(cell, row) => row.origin.description}>
          Origen
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="amount"
          dataSort
          dataFormat={format.euro}
        >
          Importe
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="installment"
          dataSort
          dataFormat={format.euro}
        >
          Cuota
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="installmentFirst"
          dataSort
          dataFormat={format.euro}
        >
          Primera cuota
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="installmentLast"
          dataSort
          dataFormat={format.euro}
        >
          Última cuota
        </TableHeaderColumn>
        <TableHeaderColumn dataField="duration" dataSort>
          Duración
        </TableHeaderColumn>
        <TableHeaderColumn dataField="paymentDay" dataSort>
          Día de pago
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="tsSignaturedDate"
          dataSort
          dataFormat={format.date}
        >
          Fecha de firma
        </TableHeaderColumn>
      </BootstrapTable>
      <ContractDetails/>
    </Panel>
  );
});

export default Contracts;