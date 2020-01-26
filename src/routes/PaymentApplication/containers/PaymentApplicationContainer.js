import {connect} from 'react-redux';
import {showModal} from 'reducers/modal';

import {actions, getPayments} from '../modules/actions';
import PaymentApplicationView from '../components/PaymentApplicationView';
import '../styles/StepWidget.scss';
import '../styles/ApplicationStep.scss';

const mapDispatchToProps = {
  ...actions,
  showCommunicationsModal: () =>
    showModal({modalType: 'CLIENT_COMMUNICATIONS'}),
  showConfirmationModal: (importe, clientId, applyPayment) => {
    return showModal({
      modalType: 'SHOW_PAYMENT_CONFIRMATION',
      modalProps: {importe, clientId, applyPayment},
    });
  },
  getPayments,
};

const mapStateToProps = ({paymentApplication, loadingBar}) => ({
  step: paymentApplication.step,
  incomes: paymentApplication.incomes,
  income: paymentApplication.income,
  possibleClients: paymentApplication.possibleClients,
  clientId: paymentApplication.clientId,
  contracts: paymentApplication.contracts,
  contract: paymentApplication.contract,
  payReceipt: paymentApplication.payReceipt,
  isLoading: !!loadingBar.default,
  payments: paymentApplication.payments,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentApplicationView);
