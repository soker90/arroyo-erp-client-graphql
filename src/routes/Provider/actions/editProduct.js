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
 * @returns {{type: (string|string), providers: {all: *}}}
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
 * @returns {{type: string, error: _getInitDataError.props}}
 * @private
 */
const _editProductError = error => ({
  type: EDIT_PRODUCT.FAILURE,
  error,
});

/**
 * Edita un producto y devuelve
 * una lista con todos los prouctos incluido
 * @returns {function(...[*]=)}
 */
export const editProduct = ({_id, code, name, provider, updateDate, amount}, callback) => async dispatch => {
  dispatch(_editProductRequest());

  try {
    const {data} = await axios.post('',
      {
        query: `
          mutation { 
            editProduct(id: "${_id}", code: "${code}", name: "${name}", provider: "${provider}", updateDate: "${updateDate}", amount: "${amount}") {
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
