import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {loadingBarReducer as loadingBar} from 'react-redux-loading-bar';

import auth from './auth';
import notifications from './notifications';
import modal from './modal';

import userReducers from './userData';
import tabs from 'components/Tabs/modules/tabs';
import historytabs from './historytabs';

export default history =>
  combineReducers({
    auth,
    modal,
    notifications,
    router: connectRouter(history),
    loadingBar,
    tabs,
    historytabs,
    ...userReducers,
  });
