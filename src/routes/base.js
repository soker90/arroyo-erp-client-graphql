import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import history from 'redux/history';

import LoginRoute from './Login';
import arroyoRoutes from './routes';
import NotFound from 'components/NotFound';

const BASE_PATH = process.env.ARROYO_ROUTER_BASE_PATH;

const routes = arroyoRoutes.map(({path, component, ...rest}) => {
  return (
    <Route path={`${BASE_PATH}/${path}`} component={component} key={path} />
  );
});

export default () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/login" component={LoginRoute} />
      {routes}
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
