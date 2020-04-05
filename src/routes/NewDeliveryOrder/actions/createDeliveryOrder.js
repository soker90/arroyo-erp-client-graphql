import axios from 'axios';
import {CREATE_DELIVERY_ORDER} from 'actions/types';
import {dateSend} from 'utils';

/**
 * Request action for createDeliveryOrder
 * @returns {{type: string}}
 * @private
 */
const _createDeliveryOrderRequest = () => ({type: CREATE_DELIVERY_ORDER.REQUEST});

/**
 * Success action for createDeliveryOrder
 * @param {Object} data
 * @returns {{type: (string|string), providers: {all: *}}}
 * @private
 */
const _createDeliveryOrderSuccess = ({data}) => ({
  type: CREATE_DELIVERY_ORDER.SUCCESS,
  notification: {
    level: 'success',
    message: data.createDeliveryOrder,
  },
});

/**
 * Error action for createDeliveryOrder
 * @param error
 * @returns {{type: string, error: _createDeliveryOrderError.props}}
 * @private
 */
const _createDeliveryOrderError = error => ({
  type: CREATE_DELIVERY_ORDER.FAILURE,
  error,
});

/**
 * Crea un nuevo albarán del proveedor
 * @returns {function(...[*]=)}
 */
export const createDeliveryOrder = ({date, provider, products}) => async dispatch => {
  dispatch(_createDeliveryOrderRequest());

  console.log(JSON.stringify(products))
  try {
    const {data} = await axios.post('',
      {
        query: `
          mutation ($date: String, $provider: String!, $products: [DeliveryNoteProductInput]) { 
            createDeliveryOrder(date: $date, provider: $provider, products: $products)
          }`,
        variables: {
          products,
          date: dateSend(date),
          provider,
        },
      },
    );

    console.log(data);

    if (data.errors) {
      dispatch(_createDeliveryOrderError(data.errors[0]));
      return;
    }
    dispatch(_createDeliveryOrderSuccess(data));

  } catch (error) {
    console.log(error);
    dispatch(_createDeliveryOrderError(error))
  }
};
