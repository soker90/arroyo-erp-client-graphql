import axios from 'axios';
import {GET_INIT_DATA} from '../types';

/**
 * Request action for getInitData
 * @returns {{type: string}}
 * @private
 */
const _getInitDataRequest = () => ({type: GET_INIT_DATA.REQUEST});

/**
 * Success action for getInitData
 * @param {Object} data
 * @returns {{type: (string|string), providers: {all: *}}}
 * @private
 */
const _getInitDataSuccess = ({data}) => ({
  type: GET_INIT_DATA.SUCCESS,
  providers: {
    all: data.getProviders,
  },
});

/**
 * Error action for getInitData
 * @param error
 * @returns {{type: string, error: _getInitDataError.props}}
 * @private
 */
const _getInitDataError = error => ({
  type: GET_INIT_DATA.FAILURE,
  error,
});

/**
 * Pide todos los datos necsearios para iniciar la aplicacion
 * una vez logueado
 * @returns {function(...[*]=)}
 */
export const getInitData = () => async dispatch => {
  dispatch(_getInitDataRequest());

  try {
    const {data} = await axios.post('',
      {
        query: `
          query { 
            getProviders {
              name
              _id
            }
          }`,
      },
    );
    if (data.errors) {
      dispatch(_getInitDataError(data.errors[0]));
      return;
    }

    dispatch(_getInitDataSuccess(data))
  } catch (error) {
    dispatch(_getInitDataError(error))
  }
};
