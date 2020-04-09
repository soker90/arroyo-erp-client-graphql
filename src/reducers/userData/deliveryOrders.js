import createReducer from 'redux/create-reducer';
import {GET_PROVIDER} from 'actions/types';

const INITIAL_STATE = {
  deliveryOrders: [],
};

/**
 * Set payload of delivery orders
 * @param {Object} state
 * @param {Object}products
 */
const setPayload = (state, {deliveryOrders}) => ({...state, ...deliveryOrders});

const ACTION_HANDLERS = {
  [GET_PROVIDER.REQUEST]: setPayload,
  [GET_PROVIDER.SUCCESS]: setPayload,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
