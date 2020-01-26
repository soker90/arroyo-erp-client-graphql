import React from 'react';
import PropTypes from 'prop-types';
import {Panel} from 'react-bootstrap';
import browserHistory from 'redux/history';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import format from 'components/util/dataFormat';
import {recoveryStatus} from 'utils/constants';

const WalletTable = ({recoveries, header, expanded, toogleBox, type}) => {
  const walletTableProps = {
    striped: true,
    hover: true,
    condensed: true,
    trClassName: 'cursor-pointer',
    height: 'auto',
    exportCSV: true,
    csvFileName: 'cubo-' + header.replace(' días', '-') + Date.now() + '.csv',
    selectRow: {
      mode: 'checkbox',
      clickToSelect: true,
      className: 'row-selected',
      onSelect: ({clientDto}) =>
        browserHistory.push(`/app/client/${clientDto.clientId}`),
      defaultSortName: 'promiseDate',
      defaultSortOrder: 'asc',
    },
  };
  const filterOrigin = r =>
    r.filter(e => type.includes(e.clientDto.originId));

  // Calculate tabla header _amount info
  const _aliveDebt = filterOrigin(recoveries).reduce(
    (prev, item) => Number(item._aliveDebt) + prev,
    0
  );
  const _demandDebt = filterOrigin(recoveries).reduce(
    (prev, item) => Number(item._demandDebt) + prev,
    0
  );
  const _capitalDebt = filterOrigin(recoveries).reduce(
    (prev, item) => Number(item.amortisationDebt) + prev,
    0
  );

  // Format table cells
  const name = (cell, row) => row.clientDto.name;
  const clientId = (cell, row) => row.clientDto.clientId;
  const _renderRecoveryStatus = status => {
    const s = recoveryStatus.find(_s => _s.key === status);
    if (s) {
      return s.value;
    }
    return '---';
  };

  const _amount = `${header} (${
    filterOrigin(recoveries).length
  }) --  D.V. ${format.euro(_aliveDebt.toFixed(0))} - T.R. ${format.euro(
    _demandDebt.toFixed(0)
  )} - K+ ${format.euro(_capitalDebt.toFixed(0))}`;

  return (
    <div>
      <Panel
        header={_amount}
        onSelect={toogleBox}
        expanded={expanded}
        collapsible={true}
      >
        <BootstrapTable {...walletTableProps} data={filterOrigin(recoveries)}>
          <TableHeaderColumn dataField="id" isKey hidden dataSort>
            Id
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="clientId"
            dataFormat={clientId}
            dataSort
          >
            Client Id
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="name"
            csvFormat={name}
            dataFormat={name}
          >
            Nombre
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="messagesNumber"
            dataAlign="center"
            dataSort
          >
            Recado
          </TableHeaderColumn>
          <TableHeaderColumn dataField="gestor" export hidden>
            Gestor
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="unpaidStatus"
            dataFormat={_renderRecoveryStatus}
            dataSort
          >
            Status
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="promiseDate"
            dataFormat={format.date}
            dataSort
          >
            Fecha Promesa
          </TableHeaderColumn>
          <TableHeaderColumn dataField="amortisationDebt" export hidden>
            K
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="scoreValue"
            export hidden
          >
            PD
          </TableHeaderColumn>
        </BootstrapTable>
      </Panel>
    </div>
  );
};

WalletTable.propTypes = {
  recoveries: PropTypes.array.isRequired,
  header: PropTypes.string.isRequired,
};

export default WalletTable;
