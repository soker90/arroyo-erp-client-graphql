import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {TableMaterial} from 'components';
import {useStyles} from './ContractsTable.styles';
import {currencySetting} from 'components/TableMaterial/utils';
import dataFormat from 'components/util/dataFormat';
import theme from 'theme';

const ContractsTable = memo(({contracts, onRowClick, selectedContract}) => {
  const classes = useStyles();
  /**
   * Handle for clink on row's table
   * @param {Object} event
   * @param {Object} contract
   * @private
   */
  const _handleRowClick = (event, contract) => {
    selectedContract !== contract.contractId &&
    onRowClick(contract.contractId);
  };

  /**
   * Establece el estilo de la fila (seleccionado o no seleccionado)
   * @param rowData
   * @returns {{backgroundColor: string}}
   * @private
   */
  const _setRowStyle = rowData => ({
    backgroundColor:
      rowData.contractId === selectedContract ?
        theme.palette.primary.light :
        '',
  });

  return (
    <TableMaterial
      className={classes.root}
      columns={[
        {title: 'ID', field: 'contractId', type: 'numeric'},
        {title: 'Oringen', field: 'origin.description'},
        {title: 'Importe', field: 'amount', type: 'currency', currencySetting},
        {title: 'Cuota', field: 'installment', type: 'currency', currencySetting},
        {title: 'Primera cuota', field: 'installmentFirst', type: 'currency', currencySetting},
        {title: 'Última cuota', field: 'installmentLast', type: 'currency', currencySetting},
        {title: 'Duración', field: 'duration', type: 'numeric'},
        {title: 'Día de pago', field: 'paymentDay', type: 'numeric'},
        {
          title: 'Fecha de firma',
          field: 'tsSignaturedDate',
          type: 'datetime',
          render: ({tsSignaturedDate}) => dataFormat.date(tsSignaturedDate),
        },
      ]}
      data={contracts}
      title='Contratos del cliente'
      onRowClick={_handleRowClick}
      options={{
        search: false,
        paging: false,
        rowStyle: _setRowStyle,
      }}
    />
  );
});

ContractsTable.propTypes = {
  contracts: PropTypes.array.isRequired,
};

export default ContractsTable;


