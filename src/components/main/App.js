import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {ThemeProvider} from '@material-ui/styles';
import history from 'redux/history';
import LoadingBar from 'react-redux-loading-bar';
import Notification from 'components/Notification';
import ModalRoot from 'components/ModalRoot';
import theme from 'theme';
import {checkTokenAlive} from 'actions/auth';

const App = ({store, routes}) => {
  useEffect(() => {
    store.dispatch(checkTokenAlive())
  }, [checkTokenAlive]);

  return <Provider store={store}>
    <ThemeProvider theme={theme}>
      <LoadingBar
        style={{zIndex: 999999, backgroundColor: theme.palette.primary.light, height: '5px'}}
      />
      <Notification/>
      <ConnectedRouter history={history}>{routes}</ConnectedRouter>
      <ModalRoot/>
    </ThemeProvider>
  </Provider>
};

App.propTypes = {
  store: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
};

export default App;
