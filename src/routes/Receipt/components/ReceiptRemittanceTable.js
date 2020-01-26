import React, {memo} from 'react';
import PropTypes from 'prop-types';
import format from 'components/util/dataFormat';
import InfoPanel from 'components/InfoPanel';
import {HEIGHT_TABLE} from '../constants';

const ReceiptRemittanceTable = memo(({remittanceReceipt}) =>
  <InfoPanel xs={6} static title="Remesas envío" height={HEIGHT_TABLE}>
    <table className="table table-responsive table-bordered">
      <thead>
      <tr>
        <th>Referencia</th>
        <th>Fecha</th>
        <th>Importe</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{remittanceReceipt?.filename}</td>
        <td>
          {format.dateShort(
            remittanceReceipt?.generationDate,
          )}
        </td>
        <td>
          {format.euro(
            remittanceReceipt?.totalAmount,
          )}
        </td>
      </tr>
      </tbody>
    </table>
  </InfoPanel>
);

ReceiptRemittanceTable.protoType = {
  remittanceReceipt: PropTypes.object,
};

export default ReceiptRemittanceTable;
