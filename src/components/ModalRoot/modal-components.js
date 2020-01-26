import paymentApplicationModals from 'routes/PaymentApplication/modals';
import clientModals from 'routes/Client/modals';
import receiptModal from 'routes/Receipt/modals';
import reunificationModal from 'routes/Reunification/modals';
import conciliationModal from 'routes/Conciliation/modals';
import templatesModal from 'routes/Templates/modals';

export default {
  ...paymentApplicationModals,
  ...clientModals,
  ...receiptModal,
  ...reunificationModal,
  ...conciliationModal,
  ...templatesModal,
};
