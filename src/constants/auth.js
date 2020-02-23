import {requestActions} from 'action-types';

export const LOGIN = requestActions('auth/LOGIN');
export const ARROYO_TOKEN = 'arroyo_token';
export const URL_FOR_AUTHENTICATE = requestActions('URL_FOR_AUTHENTICATE');

const BASE_PATH = process.env.ARROYO_ROUTER_BASE_PATH;
export const DEFAULT_REDIRECT = `${BASE_PATH}/inicio`;
export const LOGIN_ROUTE = '/login';


