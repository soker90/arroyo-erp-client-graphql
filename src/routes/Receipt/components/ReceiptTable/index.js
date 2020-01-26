import React, {memo, useState, useEffect} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {generateColumns, getLiteralTitulizated} from '../../utils';
import InfoPanel from 'components/InfoPanel';
import ReceiptTableColumn from './ReceiptTableColumn';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';
import {STATUS_CODE_SHOW_TPV} from '../../constants';

const ReceiptTable = memo(({receipt, showModifyReceiptModal, showPaymentTPVModal}) => {
  const [showTPV, setShowTPV] = useState(false);
  useEffect(() => {
    const show = STATUS_CODE_SHOW_TPV.includes(receipt.statusCod);
    setShowTPV(show);
  }, [receipt.statusCod]);

  const _showModifyReceiptModal = () => {
    showModifyReceiptModal(receipt);
  };

  const _showPaymentTPVModal = () => {
    showPaymentTPVModal(receipt.receiptId, receipt.receiptAmount);
  };

  window.setTpv = value => {
    setShowTPV(value);
  };

  /**
   * Render table of receipt
   * @return {[]}
   * @private
   */
  const _renderColumns = () =>
    generateColumns(receipt).map((rows, index) =>
      <ReceiptTableColumn rows={rows} key={index}/>,
    );

  const _renderButtons = () =>
    <Col xs={12}>
      <HasPermission access={USER_PERMISSIONS.RECEIPTS_EDIT}>
        <Button bsStyle="danger" onClick={_showModifyReceiptModal}>
          Modificar recibo
        </Button>
      </HasPermission>
      {
        showTPV &&
        <HasPermission access={USER_PERMISSIONS.TPV_EDIT}>
          <Button bsStyle="warning" onClick={_showPaymentTPVModal}>
            TPV
          </Button>
        </HasPermission>
      }
    </Col>;

  return <InfoPanel xs={12} static
                    title={`Recibo ${receipt.codReceipt} ${getLiteralTitulizated(receipt)}`}
  >
    <Row>
      {_renderColumns()}
      {_renderButtons()}
    </Row>
  </InfoPanel>
});

ReceiptTable.protoType = {
  receipt: PropTypes.object.isRequired,
  showPaymentTPVModal: PropTypes.func.isRequired,
  showModifyReceiptModal: PropTypes.func.isRequired,
};

export default ReceiptTable;
