import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Panel} from 'react-bootstrap';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import dataFormat from 'components/util/dataFormat';

const IncomesStep = memo(function IncomesStep({
  incomes,
  getIncomes,
  setIncome,
}) {
  useEffect(() => {
    getIncomes();
  }, [getIncomes]);

  const incomesTableProperties = {
    striped: true,
    hover: true,
    condensed: true,
    trClassName: 'cursor-pointer',
    pagination: true,
    options: {
      onRowClick: row => setIncome(row),
      sortName: 'fechaOperacion',
      sortOrder: 'desc',
    },
  };

  return (
    <div>
      <Panel header="Ingresos pendientes de aplicar">
        <BootstrapTable data={incomes} {...incomesTableProperties}>
          <TableHeaderColumn dataField="incomeId" isKey>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="importe" dataFormat={dataFormat.euro}>
            Importe
          </TableHeaderColumn>
          <TableHeaderColumn dataField="pagador">Pagador</TableHeaderColumn>
          <TableHeaderColumn
            dataField="fechaOperacion"
            dataFormat={dataFormat.dateShort}
          >
            Fecha operación
          </TableHeaderColumn>
        </BootstrapTable>
      </Panel>
    </div>
  );
});

IncomesStep.propTypes = {
  incomes: PropTypes.array.isRequired,
  getIncomes: PropTypes.func.isRequired,
  setIncome: PropTypes.func.isRequired,
};

export default IncomesStep;
