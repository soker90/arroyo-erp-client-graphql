import React, {memo} from 'react';
import {Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

const ReceiptTableColumn = memo(({rows}) =>
  <Col xs={4}>
    <table className="nera_contract_info">
      <tbody>
      {rows.map((row, index) =>
        <tr key={index}>
          <td className="text-bold">{row[0]}</td>
          <td className="text-right">{row[1]}</td>
        </tr>,
      )}
      </tbody>
    </table>
  </Col>,
);

ReceiptTableColumn.protoType = {
  rows: PropTypes.array.isRequired,
};

export default ReceiptTableColumn;
