import {URL_FOR_AUTHENTICATE} from 'constants/auth';

export const saveURLForAuthenticate = url  => ({
  type: URL_FOR_AUTHENTICATE.SET,
  url,
});
