import {ARROYO_TOKEN} from '../constants/auth';
import {decodeToken} from './axios-authorization';

export const checkTokenAlive = () => {
  const token = localStorage.getItem(ARROYO_TOKEN);
  if (token) {
    const tokenDecode = decodeToken(token);
    const currentTime = Date.now() / 1000;
    if (currentTime > tokenDecode.exp)
      localStorage.removeItem(ARROYO_TOKEN);
  }
};