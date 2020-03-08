import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {TableMaterial} from 'components';
import {useStyles} from './ProviderProductTable.styles';
import AddIcon from '@material-ui/icons/Add';
import {dateShort} from 'utils/dates';

const ProviderProductTable = ({products, showEditProductModal}) => {
  const classes = useStyles();

  /**
   * Muestra un modal para editar el producto seleccionado
   * @param {Object} event
   * @param {Object} row
   * @private
   */
  const _onRowClick = (event, row) => {
    showEditProductModal(row)
  };

  /**
   * Muestra un modal para añadir un nuevo producto
   * @private
   */
  const _addProduct = () => {
    showEditProductModal();
  };

  return (
    <TableMaterial
      className={classes.table}
      columns={[
        {title: 'Código', field: 'code'},
        {title: 'Nombre', field: 'name'},
        {title: 'Precio', field: 'amount'},
        {
          title: 'Fecha de actualización',
          field: 'updateDate',
          type: 'datetime',
          render: ({updateDate}) => dateShort(updateDate),
        },
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
          onClick: _addProduct,
        },
      ]}
    />
  );
};

ProviderProductTable.propTypes = {
  products: PropTypes.array.isRequired,
  showEditProductModal: PropTypes.func.isRequired,
};

export default memo(ProviderProductTable);
