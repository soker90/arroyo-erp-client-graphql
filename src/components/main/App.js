import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {ThemeProvider} from '@material-ui/styles';
import history from 'redux/history';
import {publicRoutes} from 'utils/constants';
import LoadingBar from 'react-redux-loading-bar';
import Notification from 'components/Notification';
import ModalRoot from 'components/ModalRoot';
import {checkTokenAlive} from 'actions/auth/checkTokenAlive';
import theme from 'theme';

const App = ({store, routes}) => {
  if (!publicRoutes.includes(history.location.pathname)) {
    store.dispatch(checkTokenAlive())
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LoadingBar
          style={{zIndex: 999999, backgroundColor: '#cf4d2e', height: '5px'}}
        />
        <Notification/>
        <ConnectedRouter history={history}>{routes}</ConnectedRouter>
        <ModalRoot/>
      </ThemeProvider>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
};

export default App;
