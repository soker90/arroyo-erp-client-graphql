import React, {memo} from 'react';
import PropTypes from 'prop-types';

import ReceiptTab from './ReceiptTab';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

const ReceiptView = memo(
  ({
     match,
     getReceipt,
     receipt,
     showModifyReceiptModal,
     showPaymentTPVModal,
   }) =>
    <HasPermission access={USER_PERMISSIONS.RECEIPTS_READ}>
      <ReceiptTab
        receipt={receipt}
        getReceipt={getReceipt}
        showModifyReceiptModal={showModifyReceiptModal}
        showPaymentTPVModal={showPaymentTPVModal}
        receiptId={match.params.receiptId}
      />
    </HasPermission>,
);

ReceiptView.propTypes = {
  match: PropTypes.object.isRequired,
  receipt: PropTypes.object.isRequired,
  showModifyReceiptModal: PropTypes.func.isRequired,
  getReceipt: PropTypes.func.isRequired,
  showPaymentTPVModal: PropTypes.func.isRequired,
};

export default ReceiptView;
