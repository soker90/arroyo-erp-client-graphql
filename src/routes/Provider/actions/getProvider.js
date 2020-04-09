import axios from 'axios';
import {GET_PROVIDER} from 'actions/types';
import {renameTab} from '../../../components/Tabs/modules/tabs';

/**
 * Request action for getPrivder
 * @returns {{type: string}}
 * @private
 */
const _getProviderRequest = () => ({type: GET_PROVIDER.REQUEST});

/**
 * Success action for getPrivder
 * @param {Object} data
 * @returns {{type: (string|string), providers: {all: *}}}
 * @private
 */
const _getProviderSuccess = ({data}) => ({
  type: GET_PROVIDER.SUCCESS,
  providers: {
    provider: data.getProvider,
  },
  products: {
    products: data.getProducts,
  },
  deliveryOrders: {
    deliveryOrders: data.getDeliveryOrders,
  },
});

/**
 * Error action for getPrivder
 * @param error
 * @returns {{type: string, error: _getInitDataError.props}}
 * @private
 */
const _getProviderError = error => ({
  type: GET_PROVIDER.FAILURE,
  error,
});

/**
 * Pide todos los datos necsearios para iniciar la aplicacion
 * una vez logueado
 * @returns {function(...[*]=)}
 */
export const getProvider = (id, tabId) => async dispatch => {
  dispatch(_getProviderRequest());

  try {
    const {data} = await axios.post('',
      {
        query: `
          query { 
            getProvider(id: "${id}") {
              _id
              name
              address
              phone
              email
            }
            getProducts(provider: "${id}") {
              _id
              name
              amount
              updateDate
            }
            getDeliveryOrders(provider: "${id}") {
              date
            }
          }`,
      },
    );

    if (data.errors) {
      dispatch(_getProviderError(data.errors[0]));
      return;
    }

    dispatch(_getProviderSuccess(data));

    const name = data?.data?.getProvider?.name;
    if (name)
      dispatch(renameTab(name, tabId));
  } catch (error) {
    console.log(error);
    dispatch(_getProviderSuccess(error))
  }
};
