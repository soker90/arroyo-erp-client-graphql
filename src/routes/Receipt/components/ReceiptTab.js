import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';

import {Container} from 'components/Container';
import InfoPanel from 'components/InfoPanel';

import {HEIGHT_TABLE} from '../constants';
import ReceiptRemittanceTable from './ReceiptRemittanceTable';
import ReceiptHistoryChanges from './ReceiptHistoryChanges';
import ReceiptTable from './ReceiptTable';

const ReceiptTab = memo(
  ({
     getReceipt, receipt, showModifyReceiptModal, showPaymentTPVModal,receiptId,
   }) => {
    useEffect(() => {
      getReceipt(receiptId);
    }, [getReceipt, receiptId]);

    const _renderCommentsTable = () =>
      <InfoPanel xs={6} static title="Observaciones" height={HEIGHT_TABLE}>
        {receipt.comments}
      </InfoPanel>;

    return (
      <Container className="tab-body">
        <Row>
          <Col xs={12}>
            <h3>{`Recibo cliente: ${receipt.clientFirstName}
             ${receipt.clientLastName}`}</h3>
          </Col>
          <ReceiptTable receipt={receipt} showModifyReceiptModal={showModifyReceiptModal}
                        showPaymentTPVModal={showPaymentTPVModal}/>
          <ReceiptRemittanceTable remittanceReceipt={receipt.remittanceReceiptDto}/>
          {_renderCommentsTable()}
        </Row>
        <Row>
          <ReceiptHistoryChanges receiptHis={receipt.receiptHis}/>
        </Row>
      </Container>
    );
  });

ReceiptTab.propTypes = {
  receipt: PropTypes.object.isRequired,
  getReceipt: PropTypes.func.isRequired,
  showModifyReceiptModal: PropTypes.func.isRequired,
  showPaymentTPVModal: PropTypes.func.isRequired,
};

export default ReceiptTab;
