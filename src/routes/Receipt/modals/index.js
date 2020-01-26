import ModifyReceipt from './ModifyReceipt';
import PaymentTPVReceipt from './PaymentTPVReceipt';
import {PAYMENT_TVP} from '../constants/modals';

export default {
  'MODIFY_RECEIPT': ModifyReceipt,
  [PAYMENT_TVP]: PaymentTPVReceipt,
};
