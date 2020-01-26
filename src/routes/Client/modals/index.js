import DataAndContactsModal from '../components/DataAndContacts/modals';
import ContractsModals from '../components/Contracts/modals';
import PaymentStatusModals from '../components/PaymentStatus/modals';
import CommunicationsModals from '../components/Communications/modals';

export default {
  ...DataAndContactsModal,
  ...ContractsModals,
  ...PaymentStatusModals,
  ...CommunicationsModals,
}