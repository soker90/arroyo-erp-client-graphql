import Immutable from 'immutable';
import axios from 'axios';
import browserHistory from 'redux/history';
import _ from 'lodash';

import {SEARCH} from 'action-types';
import createReducer from 'redux/create-reducer';
import convertParams from 'utils/object-to-params';
import {addNotification} from 'reducers/notifications';

const BASE_PATH = process.env.NERA_ROUTER_BASE_PATH;

function handleSearchClientsResponse(response) {
  const clients = _.get(response, 'data.client_list', []);
  if (clients.length === 1) {
    const {client_id} = clients[0];
    const path = `${BASE_PATH}/client/${client_id}`;
    browserHistory.push(path);
  }
}

export const searchClients = formData => async dispatch => {
  dispatch({type: SEARCH.REQUEST});

  try {
    const params = _.pickBy(
      formData,
      v => ![null, '', undefined, 0].includes(v)
    );
    if (!_.isEmpty(params)) {
      const URL = `client/search?${convertParams(params)}`;
      const response = await axios(URL);

      if (response.status === 204) {
        dispatch(
          addNotification({
            level: 'info',
            title: 'INFORMACIÓN DE BÚSQUEDA',
            message: 'No se han encontrado coincidencias.',
          })
        );
      }

      if (response.data) {
        dispatch({type: SEARCH.SET, payload: response.data});
        dispatch({type: SEARCH.SUCCESS});
        return handleSearchClientsResponse(response);
      }
    }
    dispatch({type: SEARCH.SUCCESS});
  } catch (error) {
    console.error(error);
    dispatch({type: SEARCH.FAILURE, error});
  }
};

export const actions = {
  searchClients,
};

const INITIAL_STATE = Immutable.fromJS({
  clients: [],
});

const ACTION_HANDLERS = {
  [SEARCH.REQUEST]: () => INITIAL_STATE,
  [SEARCH.SET]: (state, {payload}) => {
    const body = payload.client_list;
    const clients = body.map(client => ({
      ...client,
      client_id: parseInt(client.client_id, 10),
    }));
    return state.set('clients', Immutable.fromJS(clients));
  },
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
