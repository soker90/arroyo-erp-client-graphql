import axios from 'axios';
import {CREATE_PRODUCT} from 'actions/types';

/**
 * Request action for createDeliveryOrder
 * @returns {{type: string}}
 * @private
 */
const _createProductRequest = () => ({type: CREATE_PRODUCT.REQUEST});

/**
 * Success action for createDeliveryOrder
 * @param {Object} data
 * @returns {{notification: {level: string, message: *}, type: string, products: {products: *}}}
 * @private
 */
const _createProductSuccess = ({data}) => ({
  type: CREATE_PRODUCT.SUCCESS,
  products: {
    products: data.createProduct.products,
  },
  notification: {
    level: 'success',
    message: data.createProduct.message,
  },
});

/**
 * Error action for createDeliveryOrder
 * @param error
 * @returns {{type: string, error: _getInitDataError.props}}
 * @private
 */
const _createProductError = error => ({
  type: CREATE_PRODUCT.FAILURE,
  error,
});

/**
 * Crea un nuevo producto para el proveedor y devuelve
 * una lista con todos los prouctos incluido el nuevo
 * @param {String} code
 * @param {String} name
 * @param {String} provider
 * @param {Number} amount
 * @param {Number} iva
 * @param {Number} re
 * @param {Function} callback
 * @returns {function(...[*]=)}
 */
export const createProduct = ({code, name, provider, amount, iva, re}, callback) => async dispatch => {
  dispatch(_createProductRequest());

  try {
    const {data} = await axios.post('',
      {
        query: `
          mutation { 
            createProduct(code: "${code}", name: "${name}", provider: "${provider}", amount: ${amount}, iva: ${iva}, re: ${re}) {
              message
              products {
                _id
                name
                code
                amount
                iva
                re
              }
            }
          }`,
      },
    );

    if (data.errors) {
      dispatch(_createProductError(data.errors[0]));
      return;
    }
    dispatch(_createProductSuccess(data));
    callback();

  } catch (error) {
    console.log(error);
    dispatch(_createProductError(error))
  }
};
