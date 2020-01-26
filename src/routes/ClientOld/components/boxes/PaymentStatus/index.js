import PaymentStatus from './PaymentStatus';
import {showModal} from 'reducers/modal';
import {getRecoveryByClient, sendToJudicial, updateRecoveries, fetchRefinanceContractByClientId} from 'routes/ClientOld/modules/actions';
import {getRefinanceContract} from 'routes/Refinance/modules/refinance';
import {connect} from 'react-redux';

const mapStateToProps = ({client}) => ({
  clientId: client.get('clientId'),
  recovery: client.get('recovery').toJS(),
  communications: client.get('communications').toJS(),
  contracts: client.get('contracts').toJS(),
  isRefinanced: client.get('isRefinanced'),
});

const mapDispatchToProps = {
  showModalPaymentStatus: recovery =>
    showModal({modalType: 'PAYMENT_STATUS', modalProps: {recovery}}),
  getRecoveryByClient,
  getRefinanceContract,
  sendToJudicial,
  updateRecoveries,
  fetchRefinanceContractByClientId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentStatus);
