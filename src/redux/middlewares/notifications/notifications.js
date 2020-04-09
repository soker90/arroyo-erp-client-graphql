import {CREATE_DELIVERY_ORDER, CREATE_PRODUCT} from 'actions/types';

const setPayload = ({notification}) => {
  if (!notification?.level) {
    return;
  }
  return notification;
};

// Mandatory notification.level
const notifications = {
  [CREATE_PRODUCT.SUCCESS]: setPayload,
  [CREATE_DELIVERY_ORDER.SUCCESS]: setPayload,
};

export default notifications;
