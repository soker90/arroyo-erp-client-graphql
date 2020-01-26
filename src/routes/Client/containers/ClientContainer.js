import {connect} from 'react-redux';
import {
  getClientData,
  resetState,
  getPrescriber,
  getClientContracts,
  getRecoveryByClient,
  getClientCommunications,
  sendToJudicial,
} from 'routes/Client/modules/actions';

import ClientView from 'routes/Client/components/ClientView';
import {showModal} from '../../../reducers/modal';
import {MODIFY_OTHER_CONTACT_DATA} from '../components/DataAndContacts/modals/types';
import {PAYMENT_STATUS, SEND_JUDICIAL} from '../components/PaymentStatus/modals/types';
import {REGISTER_COMMUNICATION, SEND_EMAIL, SEND_PASSWORD} from '../components/Communications/modals/types';

const mapStateToProps = ({client: {client, contracts, prescriber, recovery}}) => ({
  fullname: `${client?.name || ''} ${client?.lastname || ''}`,
  prescriber,
  contract: contracts?.[0] || {},
  recovery,
});

const mapDispatchToProps = {
  resetState,
  getClientData,
  getPrescriber,
  getClientContracts,
  getRecoveryByClient,
  getClientCommunications,
  sendToJudicial,
  showModalModifyOtherContactData: () => showModal({
    modalType: MODIFY_OTHER_CONTACT_DATA,
  }),
  showModalPaymentStatus: () => showModal({modalType: PAYMENT_STATUS}),
  showModalSendPassword: () => showModal({modalType: SEND_PASSWORD}),
  showModalRegisterCommunication: () => showModal({modalType: REGISTER_COMMUNICATION}),
  showModalSendEmail: () => showModal({modalType: SEND_EMAIL}),
  showModalSendJudicial: () => showModal({modalType: SEND_JUDICIAL}),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientView);
