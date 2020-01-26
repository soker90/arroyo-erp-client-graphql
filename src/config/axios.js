import axios from 'axios';
import {addNotification} from 'reducers/notifications';

const {API_HOST} = process.env;

// ========================================================
// Axios config
// ========================================================
axios.defaults.baseURL = API_HOST;
axios.defaults.withCredentials = true;

export default dispatch => {
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 400) {
        dispatch(
          addNotification({
            level: 'warning',
            title: 'Petición rechazada',
            message:
              'Petición rechazada: Por favor, revisa los campos del formulario e inténtalo de nuevo.',
          })
        );
      }
      return Promise.reject(error);
    }
  );
};
