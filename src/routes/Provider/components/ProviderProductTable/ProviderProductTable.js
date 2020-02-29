import React from 'react';
import {TableMaterial} from 'components';
import {useStyles} from './ProviderProductTable.styles';
import AddIcon from '@material-ui/icons/Add';

const ProviderProductTable = () => {
  const classes = useStyles();

  const _onRowClick = row => {

  };

  return (
    <TableMaterial
      className={classes.table}
      columns={[
        {title: 'Nombre', field: 'name'},
        {title: 'Precio', field: 'amount'},
        {title: 'Fecha de actualización', field: 'updateDate'},
      ]}
      data={[
        {name: 'Huevos', updateDate: '19/01/2020', amount: '30,50€'},
        {name: 'Pollo', updateDate: '19/01/2020', amount: '9,40€'},
        {name: 'Pate', updateDate: '20/01/2020', amount: '55,96€'},
      ]}
      title={`Productos (3)`}
      onRowClick={_onRowClick}
      options={{
        pageSize: 5,
      }}
      actions={[
        {
          icon: AddIcon,
          tooltip: 'Añadir albarán',
          isFreeAction: true,
          onClick: () => {
          },
        },
      ]}
    />
  );
};

ProviderProductTable.propTypes = {};

export default ProviderProductTable;
