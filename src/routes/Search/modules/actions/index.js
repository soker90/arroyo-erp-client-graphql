import axios from 'axios';
import {SEARCH} from 'action-types';
import convertParams from 'utils/object-to-params';
import {addNotification} from 'reducers/notifications';
import {navigateTo} from 'utils';


const handleSearchClientsResponse = ({client_list}) => {
  if (client_list?.length === 1) {
    const {client_id} = client_list[0];
    navigateTo(`client/${client_id}`);
  }
};

const searchClientsRequest = () => ({
  type: SEARCH.REQUEST,
});

const searchClientsSuccess = ({client_list = []}) => ({
  type: SEARCH.SUCCESS,
  payload: {
    clients: client_list,
  },
});

const searchClientsError = error => ({
  type: SEARCH.FAILURE,
  payload: {
    error,
  },
});

export const searchClients = formData => async dispatch => {
  dispatch(searchClientsRequest());
  try {
    const query = convertParams(formData);
    if (!!query) {
      const URL = `client/search?${query}`;
      const response = await axios(URL);
      if (response.status === 204) {
        dispatch(
          addNotification({
            level: 'info',
            title: 'INFORMACIÓN DE BÚSQUEDA',
            message: 'No se han encontrado coincidencias.',
          }),
        );
      }

      if (response.data) {
        dispatch(searchClientsSuccess(response.data));
        handleSearchClientsResponse(response.data);
      }
    }
  } catch (error) {
    console.error(error);
    dispatch(searchClientsError(error));
  }
};
