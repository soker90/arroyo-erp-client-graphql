import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {navigateTo} from 'utils';
import {TableMaterial} from 'components';
import {useStyles} from './ResultsTable.styles';

const ResultsTable = memo(({clients}) => {
  const classes = useStyles();
  /**
   * Handle for clink on row's table
   * @param {Object} event
   * @param {number} client_id
   * @private
   */
  const _handleRowClick = (event, {client_id}) => {
    navigateTo(`client/${client_id}`);
  };

  return (
    clients?.length > 1 &&
    <TableMaterial
      className={classes.root}
      columns={[
        {title: 'ID Cliente', field: 'client_id'},
        {title: 'Nombre', field: 'name'},
        {title: 'Apellidos', field: 'lastname'},
        {title: 'Email', field: 'email'},
        {title: 'DNI', field: 'dni'},
        {title: 'Origen', field: 'origin_description'},
      ]}
      data={clients}
      title="Clientes encontrados"
      onRowClick={_handleRowClick}
    />
  );
});

ResultsTable.propTypes = {
  clients: PropTypes.array.isRequired,
};

export default ResultsTable;


