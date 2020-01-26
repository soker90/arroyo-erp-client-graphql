import {connect} from 'react-redux';
import {getClientCommunications} from 'routes/ClientOld/modules/actions';
import {showModal} from 'reducers/modal';
import Communications from './Communications';

const mapStateToProps = ({client}) => ({
  communications: client.get('communications'),
  clientId: client.get('clientId'),
});

const mapDispatchToProps = {
  getClientCommunications,
  showModalCommunication: selectedCommunication =>
    showModal({
      modalType: 'SHOW_COMMUNICATION',
      modalProps: selectedCommunication,
    }),
  showModalRegisterEmail: () => showModal({modalType: 'REGISTER_EMAIL'}),
  showModalRegisterCall: () => showModal({modalType: 'REGISTER_CALL'}),
  showModalSendEmail: () => showModal({modalType: 'SEND_EMAIL'}),
  showModalSendPassword: () => showModal({modalType: 'SEND_PASSWORD'}),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Communications);