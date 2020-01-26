import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {loadingBarReducer as loadingBar} from 'react-redux-loading-bar';

import auth from './auth';
import notifications from './notifications';
import common from './common';
import modal from './modal';
import permissions from './permissions';
import users from './users';

import wannaReducers from './_prj.wanna/reducers';

export default history =>
  combineReducers({
    auth,
    modal,
    notifications,
    router: connectRouter(history),
    loadingBar,
    common,
    permissions,
    users,
    ...wannaReducers,
  });
