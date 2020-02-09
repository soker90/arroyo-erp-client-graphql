import React from 'react';
import {TableMaterial} from 'components';
import {useStyles} from './ProviderInvoiceTable.styles';
import AddIcon from '@material-ui/icons/Add';

const ProviderInvoiceTable = () => {
  const classes = useStyles();

  const _onRowClick = row => {

  };

  return (
    <TableMaterial
      className={classes.table}
      columns={[
        {title: 'Fecha', field: 'date'},
        {title: 'Importe', field: 'amount'},
      ]}
      data={[
        {date: '19/01/2020', amount: '30,50€'},
        {date: '19/01/2020', amount: '9,40€'},
        {date: '20/01/2020', amount: '55,96€'},
      ]}
      title={`Facturas (3)`}
      onRowClick={_onRowClick}
      options={{
        pageSize: 5,
      }}
      actions={[
        {
          icon: AddIcon,
          tooltip: 'Crear factura',
          isFreeAction: true,
          onClick: () => {
          },
        },
      ]}
    />
  );
};

ProviderInvoiceTable.propTypes = {};

export default ProviderInvoiceTable;
