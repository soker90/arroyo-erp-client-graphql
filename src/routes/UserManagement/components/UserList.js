import React, {memo} from 'react';
import {isEmpty} from 'lodash';
import {Panel} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const UserList = memo(function UserList({users, handleSelectUser}) {
  const handleRowClick = row => {
    handleSelectUser(row);
  };

  const tableOptions = {
    striped: true,
    hover: true,
    condensed: true,
    trClassName: 'cursor-pointer',
    pagination: true,
    options: {
      sortName: 'login',
      sortOrder: 'asc',
    },
    selectRow: {
      mode: 'radio',
      clickToSelect: true,
      onSelect: handleRowClick,
      className: 'row-selected',
    },
  };

  const roleList = (cell, row) =>
    !isEmpty(row.roles) && row.roles[0].description;

  return (
    !isEmpty(users) && (
      <Panel header={`Usuarios encontrados (${users.length})`}>
        <BootstrapTable data={users} {...tableOptions}>
          <TableHeaderColumn
            filter={{type: 'TextFilter', delay: 300}}
            dataSort
            isKey
            dataField="login"
          >
            Login
          </TableHeaderColumn>
          <TableHeaderColumn
            filter={{type: 'TextFilter', delay: 300}}
            dataSort
            dataField="email"
          >
            Email
          </TableHeaderColumn>
          <TableHeaderColumn
            filter={{type: 'TextFilter', delay: 300}}
            dataSort
            dataField="name"
          >
            Nombre
          </TableHeaderColumn>
          <TableHeaderColumn
            filter={{type: 'TextFilter', delay: 300}}
            dataSort
            dataField="lastname"
          >
            Apellidos
          </TableHeaderColumn>
          <TableHeaderColumn
            filter={{type: 'TextFilter', delay: 300}}
            dataSort
            dataField="dni"
          >
            DNI
          </TableHeaderColumn>
          <TableHeaderColumn
            filter={{type: 'TextFilter', delay: 300}}
            dataSort
            dataFormat={roleList}
            dataField="roles"
          >
            Roles
          </TableHeaderColumn>
        </BootstrapTable>
      </Panel>
    )
  );
});

export default UserList;
