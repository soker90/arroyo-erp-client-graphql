import {connect} from 'react-redux';
import {getRecoveryByClient} from 'routes/Client/modules/actions';
// import {getRefinanceContract} from 'routes/Refinance/modules/refinance';
import PaymentStatus from '../PaymentStatus';

const mapStateToProps = ({client}) => ({
  clientId: client.clientId,
  recovery: client.recovery,
  communications: client.communications,
  isRefinanced: client.isRefinanced,
  contracts: client.contracts,
  hasInsurance: !!client.contracts.find(t => t.hasInsurance),
});

const mapDispatchToProps = {
  getRecoveryByClient,
  // getRefinanceContract,
  // sendToJudicial,
  // updateRecoveries,
  // fetchRefinanceContractByClientId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentStatus);
