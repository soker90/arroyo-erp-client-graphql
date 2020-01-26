import React from 'react';
import PropTypes from 'prop-types';
import browserHistory from 'redux/history';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Panel} from 'react-bootstrap';

import {recoveryStatus} from 'utils/constants';

const ClaimsTable = ({claims}) => {
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

  return (
    <Panel header={`Expedientes a Judicial (${claims.length})`}>
      <BootstrapTable {...calendarTableProps} data={claims}>
        <TableHeaderColumn
          dataField="clientId"
          isKey
          dataFormat={clientId}
          dataSort
        >
          Id
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="unpaidStatus"
          dataFormat={_renderRecoveryStatus}
          dataSort
        >
          Status
        </TableHeaderColumn>
        <TableHeaderColumn dataField="judicial" dataSort>
          Enviado
        </TableHeaderColumn>
      </BootstrapTable>
    </Panel>
  );
};

ClaimsTable.propTypes = {
  claims: PropTypes.array.isRequired,
};

export default ClaimsTable;
