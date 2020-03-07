import axios from 'axios';
import {CREATE_PRODUCT} from 'actions/types';

/**
 * Request action for createProduct
 * @returns {{type: string}}
 * @private
 */
const _createProductRequest = () => ({type: CREATE_PRODUCT.REQUEST});

/**
 * Success action for createProduct
 * @param {Object} data
 * @returns {{type: (string|string), providers: {all: *}}}
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
 * Error action for createProduct
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
 * @returns {function(...[*]=)}
 */
export const createProduct = ({code, name, provider}, callback) => async dispatch => {
  dispatch(_createProductRequest());

  try {
    const {data} = await axios.post('',
      {
        query: `
          mutation { 
            createProduct(code: "${code}", name: "${name}", provider: "${provider}") {
              message
              products {
                _id
                name
                code
                updateDate
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
