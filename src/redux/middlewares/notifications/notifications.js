import {CREATE_PRODUCT} from 'actions/types';

const setPayload = ({notification}) => {
  if (!notification?.level) {
    return;
  }
  return notification;
};

// Mandatory notification.level
const notifications = {
  [CREATE_PRODUCT.SUCCESS]: setPayload,
};

export default notifications;
