import React from 'react';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Panel} from 'react-bootstrap';

import format from 'components/util/dataFormat';

const colums = ['ZERO', 'THIRTY', 'SIXTY', 'NINETY', 'HUNDRED_EIGHTY'];

/**
 *
 * @param {Object} recoveries
 *
 * Table to show wallet debt in detail
 */
const AmountBox = ({recoveries, toogleDetails, expanded, type}) => {
  /**
   * declare variables
   */
  const amountDetailsWalletTableProps = {
    striped: true,
    condensed: true,
    height: 'auto',
    exportCSV: true,
    remote: true,
    csvFileName: 'detalle-deuda' + Date.now() + '.csv',
  };
  let walletTableDetailsData = [];
  let aliveDebt = 0;
  let demandDebt = 0;
  let capitalDebt = 0;
  let totalAliveDebt = 0;
  let totalDemandDebt = 0;
  let totalCapitalDebt = 0;
  let rowDV = {};
  let rowTR = {};
  let rowK = {};

  const filterOrigin = r =>
    r.filter(e => type.includes(e.clientDto.originId));

  // Check for data to be ready
  if (
    recoveries.ZERO ||
    recoveries.THIRTY ||
    recoveries.SIXTY ||
    recoveries.NINETY ||
    recoveries.HUNDRED_EIGHTY
  ) {
    /**
     * iterate over each one of the boxes data
     */
    for (let i = 0; i < colums.length; ++i) {
      // Create rowDV object with alive debt amounts
      aliveDebt = Number(
        filterOrigin(recoveries[colums[i]]).reduce(
          (prev, item) => Number(item.aliveDebt) + prev,
          0
        )
      );
      totalAliveDebt += aliveDebt;
      rowDV[colums[i]] = aliveDebt;
      rowDV['TOTAL'] = totalAliveDebt;

      // Create rowTR object with demand debt amounts
      demandDebt = Number(
        filterOrigin(recoveries[colums[i]]).reduce(
          (prev, item) => Number(item.demandDebt) + prev,
          0
        )
      );
      totalDemandDebt += demandDebt;
      rowTR[colums[i]] = demandDebt;
      rowTR['TOTAL'] = totalDemandDebt;

      // Create rowK object with capital debt amount
      capitalDebt = Number(
        filterOrigin(recoveries[colums[i]]).reduce(
          (prev, item) => Number(item.amortisationDebt) + prev,
          0
        )
      );
      totalCapitalDebt += capitalDebt;
      rowK[colums[i]] = capitalDebt;
      rowK['TOTAL'] = totalCapitalDebt;
    }

    // Fill data in table array
    walletTableDetailsData.push(
      {debtType: 'Deuda Viva', ...rowDV},
      {debtType: 'Total Reclamado', ...rowTR},
      {debtType: 'Capital Pendiente', ...rowK}
    );
  }

  return (
    <div>
      <Panel
        header={expanded ? 'Ocultar' : 'Mostrar Detalles'}
        onSelect={toogleDetails}
        expanded={expanded}
        collapsible={true}
      >
        <BootstrapTable
          {...amountDetailsWalletTableProps}
          data={walletTableDetailsData}
        >
          <TableHeaderColumn dataField="debtType" isKey>
            Deuda
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="ZERO"
            dataAlign="right"
            dataFormat={format.euro}
          >
            Menos de 30 dias
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="THIRTY"
            dataAlign="right"
            dataFormat={format.euro}
          >
            Entre 30 y 60 dias
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="SIXTY"
            dataAlign="right"
            dataFormat={format.euro}
          >
            Entre 60 y 90 dias
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="NINETY"
            dataAlign="right"
            dataFormat={format.euro}
          >
            Entre 90 y 180 dias
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="HUNDRED_EIGHTY"
            dataAlign="right"
            dataFormat={format.euro}
          >
            Más de 180 dias
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="TOTAL"
            dataAlign="right"
            dataFormat={format.euro}
          >
            TOTAL
          </TableHeaderColumn>
        </BootstrapTable>
      </Panel>
    </div>
  );
};

AmountBox.propTypes = {
  recoveries: PropTypes.object.isRequired,
  toogleDetails: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
};

export default AmountBox;
