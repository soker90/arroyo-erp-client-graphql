import createReducer from 'redux/create-reducer';
import {CREATE_PRODUCT, GET_PROVIDER, GET_PRODUCTS_NEW_ALBARAN, GET_PROVIDERS_NEW_PROVIDER} from 'actions/types';

const INITIAL_STATE = {
  products: [],
};

/**
 * Set payload of products
 * @param {Object} state
 * @param {Object}products
 */
const setPayloadProducts = (state, {products}) => ({...state, ...products});

const ACTION_HANDLERS = {
  [GET_PROVIDER.REQUEST]: setPayloadProducts,
  [GET_PROVIDER.SUCCESS]: setPayloadProducts,
  [CREATE_PRODUCT.SUCCESS]: setPayloadProducts,
  [GET_PRODUCTS_NEW_ALBARAN.SUCCESS]: setPayloadProducts,
  [GET_PROVIDERS_NEW_PROVIDER.SUCCESS]: setPayloadProducts,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
