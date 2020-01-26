import {connect} from 'react-redux';
import PaymentStatusModal from './PaymentStatusModal';
import {saveRecoveryData} from 'routes/Client/modules/actions';

const mapStateToProps = ({client: {recovery, client: {clientId}}}) => ({
  clientId,
  recovery,
});

const mapDispatchToProps = {
  saveRecoveryData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentStatusModal);