import React from 'react';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import format from 'components/util/dataFormat';

const showValidation = v =>
  v === true ? (
    <div className="loan-check loan-valid" />
  ) : (
    <div className="loan-check loan-invalid" />
  );

const formatIban = iban => {
  if (typeof iban === 'string') {
    return `**** **** ** ******${iban.slice(20, 24)}`;
  }
  return iban;
};

const ReunificationTable = ({
  reunificationData,
  showModalEditReuLoan,
  status,
}) => {
  const valid = !['reu_des', 'reu_ref'].includes(status);
  const loansTableProperties = {
    striped: true,
    hover: true,
    condensed: true,
    trClassName: 'cursor-pointer',
    options: {
      onRowClick: row => {
        if (valid && row.reunificationEntityId) {
          return showModalEditReuLoan(row, reunificationData.reunificationId);
        }
      },
      sortName: 'iban',
      sortOrder: 'desc',
    },
  };

  return (
    <BootstrapTable
      data={reunificationData.reunificationLoansDtoList || []}
      {...loansTableProperties}
    >
      <TableHeaderColumn dataField="reunificationEntityId" isKey hidden />
      <TableHeaderColumn dataAlign="right" dataField="entityName" dataSort>
        Entidad
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="iban"
        dataFormat={formatIban}
        dataAlign="right"
        dataSort
      >
        IBAN
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="amount"
        dataAlign="right"
        dataFormat={format.euro}
        dataSort
        width="120"
      >
        Importe
      </TableHeaderColumn>
      <TableHeaderColumn
        dataFormat={showValidation}
        filterFormatted
        dataField="debtCert"
        dataAlign="right"
        dataSort
        width="120"
      >
        Cert. deuda
      </TableHeaderColumn>
      <TableHeaderColumn
        dataFormat={showValidation}
        filterFormatted
        dataField="paymentLetter"
        dataAlign="right"
        dataSort
        width="120"
      >
        Carta de pago
      </TableHeaderColumn>
    </BootstrapTable>
  );
};

ReunificationTable.propTypes = {
  reunificationData: PropTypes.shape({
    reunificationId: PropTypes.number.isRequired,
    reunificationLoansDtoList: PropTypes.array.isRequired,
  }).isRequired,
  showModalEditReuLoan: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default ReunificationTable;
