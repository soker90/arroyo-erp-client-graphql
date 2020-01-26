import React from 'react';
import PropTypes from 'prop-types';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Panel} from 'react-bootstrap';
import browserHistory from 'redux/history';

import {recoveryStatus} from 'utils/constants';
import format from 'components/util/dataFormat';

const CalendarTable = ({recoveries, header, type}) => {
  const calendarTableProps = {
    striped: true,
    hover: true,
    condensed: true,
    trClassName: 'cursor-pointer',
    height: 300,
    selectRow: {
      mode: 'radio',
      clickToSelect: true,
      className: 'row-selected',
      onSelect: ({clientDto}) =>
        browserHistory.push(`/app/client/${clientDto.clientId}`),
      defaultSortName: 'clientId',
      defaultSortOrder: 'desc',
    },
  };

  const clientId = (cell, row) => row.clientDto.clientId;

  function _renderRecoveryStatus(status) {
    const s = recoveryStatus.find(_s => _s.key === status);
    if (s) {
      return s.value;
    }
    return '---';
  }

  const filterPrescriber = r =>
    r.filter(e => type.includes(e.clientDto.originId));

  return (
    <div>
      <Panel header={header}>
        <BootstrapTable
          {...calendarTableProps}
          data={filterPrescriber(recoveries)}
        >
          <TableHeaderColumn
            dataField="clientId"
            isKey
            dataFormat={clientId}
            dataSort
          >
            Id
          </TableHeaderColumn>
          <TableHeaderColumn dataField="numUmpaids" dataSort>
            Impagados
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="unpaidStatus"
            dataFormat={_renderRecoveryStatus}
            dataSort
          >
            Status
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="demandDebt"
            dataFormat={format.euro}
            dataSort
            dataAlign="right"
          >
            Pendiente
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="nextProcess"
            dataFormat={format.date}
            dataSort
            dataAlign="right"
          >
            Pendiente
          </TableHeaderColumn>
        </BootstrapTable>
      </Panel>
    </div>
  );
};

CalendarTable.propTypes = {
  recoveries: PropTypes.array.isRequired,
};

export default CalendarTable;
