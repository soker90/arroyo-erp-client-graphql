import {PAYMENT_STATUS, SEND_JUDICIAL} from './types';
import PaymentStatusModal from './PaymentStatusModal';
import SendAbogado from './SendAbogado';

export default {
  [PAYMENT_STATUS]: PaymentStatusModal,
  [SEND_JUDICIAL]: SendAbogado,
}