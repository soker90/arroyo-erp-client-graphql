import {connect} from 'react-redux';

import ReceiptView from '../components/ReceiptView';
import {getReceipt, showModifyReceiptModal} from '../modules/receipt';
import {showPaymentTPVModal, getAmountTPV} from '../modules/tpv';

const mapStateToProps = ({receipt}) => ({
  receipt,
});

const mapDispatchToProps = {getReceipt, showModifyReceiptModal, showPaymentTPVModal, getAmountTPV};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReceiptView);
