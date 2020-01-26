import {showModal} from 'reducers/modal';
import {PAYMENT_TVP} from 'routes/Receipt/constants/modals';

export const showPaymentTPVModal = receiptId => dispatch => {
  dispatch(
    showModal({
      modalType: PAYMENT_TVP,
      modalProps: {receiptId},
    }),
  );
};

