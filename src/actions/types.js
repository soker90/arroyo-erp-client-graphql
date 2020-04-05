import {requestActions} from 'action-types';

// Provider
export const GET_PROVIDER = requestActions('GET_PROVIDER');
export const GET_PROVIDERS = requestActions('GET_PROVIDERS');
export const GET_PROVIDERS_NEW_PROVIDER = requestActions('GET_PROVIDER_NEW_PROVIDER');

// Product
export const CREATE_PRODUCT = requestActions('CREATE_PRODUCT');
export const EDIT_PRODUCT = requestActions('EDIT_PRODUCT');

// Albarán
export const GET_PRODUCTS_NEW_ALBARAN = requestActions('GET_PRODUCTS_NEW_ALBARAN');
export const CREATE_DELIVERY_ORDER = requestActions('CREATE_DELIVERY_ORDER');
