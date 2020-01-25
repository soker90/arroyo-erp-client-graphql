import {addNotification} from 'reducers/notifications';
import notifications from './notifications';
import {get} from 'lodash';

export const notificationDefaultParams = {
  title: '',
  message: '',
  level: 'success', // success | error | warning | info
  position: 'tr', // tr | tl | tc | br | bl | bc
  autoDismiss: 4,
  dismissible: false,
};

const failureRegexp = /_FAILURE$/;
const deniedAccess = 'No tienes permiso para ver este recurso';

function parseErrorMessage(errorObj) {
  const data = get(errorObj, 'response.data', {});
  let {title, code, status, error, message, exception} = data;

  error = error === 'Forbidden' ? deniedAccess : error;
  title = title || error;
  code = code || status || '';
  title = `[${code}] - ${title}`;
  message = exception ? `${message} - ${exception}` : message;
  message = message || error;

  return [message, title];
}

const notificationsMiddleware = store => next => action => {
  const notification = notifications[action.type];

  if (notification) {
    const notificationParams = notification(action.payload);

    if (notificationParams) {
      const notificationAction = addNotification({
        ...notificationDefaultParams,
        ...notificationParams,
      });

      store.dispatch(notificationAction);
    }
  } else if (failureRegexp.test(action.type)) {
    const [message] = parseErrorMessage(action.error);

    if (message) {
      const notificationAction = addNotification({
        ...notificationDefaultParams,
        level: 'error',
        message,
        autoDismiss: 0,
        dismissible: true,
      });

      store.dispatch(notificationAction);
    }
  }

  return next(action);
};

export default notificationsMiddleware;
