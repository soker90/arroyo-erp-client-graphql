import React, {memo} from 'react';
import {TableMaterial} from 'components';
import {useStyles} from './ProviderProductTable.styles';
import AddIcon from '@material-ui/icons/Add';

const ProviderProductTable = ({products}) => {
  const classes = useStyles();

  const _onRowClick = row => {

  };

  console.log(products)
  return (
    <TableMaterial
      className={classes.table}
      columns={[
        {title: 'Nombre', field: 'name'},
        {title: 'Precio', field: 'amount'},
        {title: 'Fecha de actualización', field: 'updateDate'},
      ]}
      data={products}
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

export default memo(ProviderProductTable);
