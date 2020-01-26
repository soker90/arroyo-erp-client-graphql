import React, {memo, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {actions} from '../../../modules/actions';
import browserHistory from 'redux/history';

import ExportsToCsvTable from './ExportsToCsvTable';

const BASE_PATH = process.env.NERA_ROUTER_BASE_PATH;

const getReceipts = receipts => {
  let newReceipts = [];
  receipts.forEach(item => {
    newReceipts.push({
      Pago: item.paymentNumber,
      Recibo: item.codReceipt,
      Importe: item.receiptAmount,
      Capital: item.amortisation,
      Interes: item.interestAmount,
      'Capital Pendiente': item.pendingCapital,
      Vencimiento: item.maturityDate,
      Estado: item.statusCod,
      'Fecha Abono': item.paymentDate,
      Titulizado: item.titulizated,
      receiptId: item.receiptId,
    });
  });
  return newReceipts;
};

const ReceiptsTable = memo(({receipts}) => {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      tableDataProps: {
        data: [],
      },
    }
  );


  useEffect(() => {
    setState({
      tableDataProps: {
        receiptsTableProps: {
          ..._receiptsTableProps,
        },
        data: getReceipts(receipts),
      },
    });
    // eslint-disable-next-line
  }, [receipts]);

  const _handleRowClick = row => {
    browserHistory.push(`${BASE_PATH}/finance/receipt/${row.receiptId}`);
  };

  const _receiptsTableProps = {
    trClassName: 'cursor-pointer',
    striped: true,
    condensed: true,
    remote: true,
    csvFileName: Date.now() + '.csv',
    options: {
      onRowClick: _handleRowClick,
    },
  };

    return <ExportsToCsvTable {...state.tableDataProps} />;
});

ReceiptsTable.propTypes = {
  receipts: PropTypes.array.isRequired,
};

const mapDispatchToProps = {...actions};

const mapStateToProps = ({client}) => ({
  receipts: client.get('receipts').toJS(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceiptsTable);
