import axios from 'axios';
import {GET_PROVIDER} from 'actions/types';

/**
 * Request action for getPrivder
 * @returns {{type: string}}
 * @private
 */
const _getPrivderRequest = () => ({type: GET_PROVIDER.REQUEST});

/**
 * Success action for getPrivder
 * @param {Object} data
 * @returns {{type: (string|string), providers: {all: *}}}
 * @private
 */
const _getPrivderSuccess = ({data}) => ({
  type: GET_PROVIDER.SUCCESS,
  providers: {
    provider: data.getProvider,
  },
});

/**
 * Error action for getPrivder
 * @param error
 * @returns {{type: string, error: _getInitDataError.props}}
 * @private
 */
const _getPrivderError = error => ({
  type: GET_PROVIDER.FAILURE,
  error,
});

/**
 * Pide todos los datos necsearios para iniciar la aplicacion
 * una vez logueado
 * @returns {function(...[*]=)}
 */
export const getProvider = id => async dispatch => {
  dispatch(_getPrivderRequest());

  try {
    const {data} = await axios.post('',
      {
        query: `
          query { 
            getProvider(id: "${id}") {
              address
            }
          }`,
      },
    );
    if (data.errors) {
      dispatch(_getPrivderError(data.errors[0]));
      return;
    }

    dispatch(_getPrivderSuccess(data))
  } catch (error) {
    dispatch(_getPrivderError(error))
  }
};
