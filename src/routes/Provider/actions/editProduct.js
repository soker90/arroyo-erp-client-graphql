import axios from 'axios';
import {EDIT_PRODUCT} from 'actions/types';

/**
 * Request action for editProduct
 * @returns {{type: string}}
 * @private
 */
const _editProductRequest = () => ({type: EDIT_PRODUCT.REQUEST});

/**
 * Success action for editProduct
 * @param {Object} data
 * @returns {{notification: {level: string, message: *}, type: string, products: {products: *}}}
 * @private
 */
const _editProductSuccess = ({data}) => ({
  type: EDIT_PRODUCT.SUCCESS,
  products: {
    products: data.editProduct.products,
  },
  notification: {
    level: 'success',
    message: data.editProduct.message,
  },
});

/**
 * Error action for editProduct
 * @param error
 * @returns {{type: string, error: _editProductError.props}}
 * @private
 */
const _editProductError = error => ({
  type: EDIT_PRODUCT.FAILURE,
  error,
});

/**
 * Edita un producto y devuelve
 * una lista con todos los prouctos incluido
 * @param {String} _id
 * @param {String} code
 * @param {String} name
 * @param {String} provider
 * @param {Number} amount
 * @param {Number} iva
 * @param {Number} re
 * @param {Function} callback
 * @returns {function(...[*]=)}
 */
export const editProduct = (
  {
    _id, code, name, provider, amount, iva, re,
  },
  callback) => async dispatch => {
  dispatch(_editProductRequest());

  try {
    const {data} = await axios.post('',
      {
        query: `
          mutation { 
            editProduct(input: {_id: "${_id}", code: "${code}", name: "${name}", provider: "${provider}", amount: ${amount}, iva: ${iva}, re: ${re}}) {
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
      dispatch(_editProductError(data.errors[0]));
      return;
    }
    dispatch(_editProductSuccess(data));
    callback();

  } catch (error) {
    console.log(error);
    dispatch(_editProductError(error))
  }
};
