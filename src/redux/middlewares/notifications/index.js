import {addNotification} from 'reducers/notifications';
import notifications from './notifications';

export const notificationDefaultParams = {
  title: '',
  message: '',
  level: 'success', // success | error | warning | info
  position: 'tr', // tr | tl | tc | br | bl | bc
  autoDismiss: 4,
  dismissible: false,
};

const failureRegexp = /_FAILURE$/;
const internalError = '500: Error en el servidor';

const _parseErrorMessage = ({response}) => {
  const statusCatch = response?.status;
  if (statusCatch === 500)
    return [internalError];

  const errors = response?.data.errors;
  return errors ? errors.map(({message}) => message) : [];
};

const notificationsMiddleware = store => next => action => {
  const notification = notifications[action.type];

  if (notification) {
    const notificationParams = notification(action);

    if (notificationParams) {
      const notificationAction = addNotification({
        ...notificationDefaultParams,
        ...notificationParams,
      });

      store.dispatch(notificationAction);
    }
  } else if (failureRegexp.test(action.type)) {
    const errors = _parseErrorMessage(action?.error);
    console.log(errors)
    if (errors.length) {
      errors.forEach(message => {
        const notificationAction = addNotification({
          ...notificationDefaultParams,
          level: 'error',
          message,
          autoDismiss: 3,
          dismissible: true,
        });

        store.dispatch(notificationAction);
      });
    }
  }

  return next(action);
};

export default notificationsMiddleware;
