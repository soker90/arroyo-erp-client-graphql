import React, {memo} from 'react';
import {TableMaterial} from 'components';
import {useStyles} from './ProviderProductTable.styles';
import AddIcon from '@material-ui/icons/Add';

const ProviderProductTable = ({products, showEditProductModal}) => {
  const classes = useStyles();

  const _onRowClick = (event, row) => {
    showEditProductModal(row)
  };

  return (
    <TableMaterial
      className={classes.table}
      columns={[
        {title: 'Nombre', field: 'name'},
        {title: 'Precio', field: 'amount'},
        {title: 'Fecha de actualización', field: 'updateDate'},
      ]}
      data={products}
      title={`Productos (${products.length})`}
      onRowClick={_onRowClick}
      options={{
        pageSize: 5,
      }}
      actions={[
        {
          icon: AddIcon,
          tooltip: 'Añadir producto',
          isFreeAction: true,
          onClick: showEditProductModal,
        },
      ]}
    />
  );
};

ProviderProductTable.propTypes = {};

export default memo(ProviderProductTable);
