import React, {memo} from 'react';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import {TableMaterial} from 'components';
import {useStyles} from './ProviderAlbaranTable.styles';
import {dateShort} from 'utils';

const ProviderAlbaranTable = ({deliveryOrders}) => {
  const classes = useStyles();

  const _onRowClick = row => {

  };

  return (
    <TableMaterial
      className={classes.table}
      columns={[
        {title: 'Fecha', render: ({date}) => dateShort(date)},
        // {title: 'Importe', field: 'amount'},
      ]}
      data={deliveryOrders}
      title={`Albaranes (${deliveryOrders.length})`}
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

ProviderAlbaranTable.propTypes = {
  deliveryOrders: PropTypes.array,
};

ProviderAlbaranTable.displayName = 'ProviderAlbaranTable';

export default memo(ProviderAlbaranTable);
