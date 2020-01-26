import {connect} from 'react-redux';

import PaymentTPVReceiptView from './PaymentTPVReceiptView';
import {sendPaymentTPV, getAmountTPV} from '../../modules/tpv';
import {addNotification} from 'reducers/notifications';

const mapStateToProps = ({receipt: {amountTPV, pendingPayment}}) => ({amountTPV, pendingPayment});

const mapDispatchToProps = {sendPaymentTPV, addNotification, getAmountTPV};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentTPVReceiptView);
