import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Row} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import {Container} from 'components/Container';
import InfoPanel from 'components/InfoPanel';
import dataFormat from 'components/util/dataFormat';
import PaymentApplicationSearch from './PaymentApplicationSearch';

const PaymentApplicationListView = memo(({payments, getPayments}) => {
  useEffect(() => {
    getPayments();
  }, [getPayments]);

  const _renderTableHeaderColumn = (id, label, othersProps) =>
    <TableHeaderColumn
      dataField={id}
      dataSort
      {...othersProps}
    >
      {label}
    </TableHeaderColumn>;

  return (
    <Container className="tab-body">
      <Row>
        <PaymentApplicationSearch getPayments={getPayments}/>

        <InfoPanel xs={12} static title={`Pagos aplicados (${payments.length})`}>
          <BootstrapTable
            striped
            hover
            data={payments}
            condensed
            pagination={payments.length > 10}
            exportCSV={true}
            csvFileName={'historico-aplicacion-pagos.csv'}
          >
            {_renderTableHeaderColumn('incomeId', 'incomeId', {isKey: true, hidden: true})}
            {_renderTableHeaderColumn('pagador', 'Pagador')}
            {_renderTableHeaderColumn('fechaOperacion', 'Fecha operación', {dataFormat: dataFormat.date, csvFormat: dataFormat.date})}
            {_renderTableHeaderColumn('importe', 'Importe', {dataFormat: dataFormat.number, csvFormat: dataFormat.number})}
            {_renderTableHeaderColumn('comentario', 'Comentario')}
            {_renderTableHeaderColumn('contractId', 'contractId')}
            {_renderTableHeaderColumn('clientId', 'clientId')}
          </BootstrapTable>
        </InfoPanel>
      </Row>
    </Container>
  );
});

PaymentApplicationListView.propTypes = {
  payments: PropTypes.array.isRequired,
  getPayments: PropTypes.func.isRequired,
};

export default PaymentApplicationListView;
