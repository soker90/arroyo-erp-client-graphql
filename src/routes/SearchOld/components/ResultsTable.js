import React from 'react';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Panel} from 'react-bootstrap';
import {navigateTo} from '../../../utils';


function ResultsTable({clients}) {
  const handleRowClick = row => {
   navigateTo(`client/${row.client_id}`);
  };

  const tableOptions = {
    onRowClick: handleRowClick,
  };

  return (
    clients.length > 1 && (
      <Panel header="Clientes encontrados">
        <BootstrapTable
          data={clients}
          pagination
          condensed
          options={tableOptions}
          trClassName="nera_table_tr"
        >
          <TableHeaderColumn dataSort dataField="client_id" isKey>
            ID Cliente
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="name">
            Nombre
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="lastname">
            Apellidos
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="email" width="250">
            Email
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="dni">
            DNI
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="origin_description">
            Origen
          </TableHeaderColumn>
        </BootstrapTable>
      </Panel>
    )
  );
}

ResultsTable.propTypes = {
  clients: PropTypes.object.isRequired,
};

export default ResultsTable;
