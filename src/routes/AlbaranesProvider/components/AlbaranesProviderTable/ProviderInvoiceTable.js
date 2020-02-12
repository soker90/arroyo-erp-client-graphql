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
        {title: 'Nº orden', field: 'order'},
        {title: 'Fecha de factura', field: 'date'},
        {title: 'Nº factura', field: 'invoice'},
        {title: 'Proveedor', field: 'provider'},
        {title: 'CIF', field: 'cif'},
        {title: 'Importe', field: 'amount'},
        {title: 'Tipo', field: 'type'},
      ]}
      data={[
        {
          date: '19/01/2020',
          amount: '30,50€',
          order: 1,
          provider: 'La abuela',
          cif: '17845',
          invoice: '2344',
          type: 'SS',
        },
        {
          date: '19/01/2020',
          amount: '9,40€',
          order: 2,
          provider: 'Chato',
          cif: '56ju5R',
          invoice: '2344',
          type: 'nómina',
        },
        {date: '20/01/2020', amount: '55,96€', order: 3, provider: 'Aldo', cif: '006445R', invoice: '2344', type: ''},
      ]}
      title={`Facturas (3)`}
      onRowClick={_onRowClick}
      options={{
        paging: false,
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
