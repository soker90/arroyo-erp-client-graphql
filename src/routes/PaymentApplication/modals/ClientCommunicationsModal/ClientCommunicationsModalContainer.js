import {connect} from 'react-redux';
import {getClientCommunications} from '../../modules/actions';
import ClientCommunicationsModal from './ClientCommunicationsModal';

const mapDispatchToProps = {
  getClientCommunications,
};

const mapStateToProps = ({paymentApplication}) => ({
  clientId: paymentApplication.clientId,
  communications: paymentApplication.communications,
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientCommunicationsModal);
