import React from 'react';
import ReactDOM from 'react-dom';

import {newVersionAvailable, swReady} from 'utils/updates';
import * as serviceWorker from './serviceWorker';
import createRoutes from './routes/base';
import configureStore from './redux/create-store';
import App from './components/main/App';
//import './styles/core.scss';
//import 'react-quill/dist/quill.snow.css';
//import 'react-datepicker/dist/react-datepicker.css';
// import './mixins/chartjs';
// import './mixins/moment';
// import './mixins/validate';
// import './mixins/prismjs';
import './assets/scss/index.scss';

const {REACT_APP_VERSION, REACT_APP_ENV_NAME} = process.env;

// ========================================================
// Auto Update window title (navigator)
// ========================================================
function setWindowTitle() {
  const title = ['ARROYO', REACT_APP_VERSION];
  if (REACT_APP_ENV_NAME) {
    title.unshift(`[${REACT_APP_ENV_NAME}]`);
  }

  document.getElementsByTagName('title')[0].innerHTML = title.join(' ');
}

// ========================================================
// Configure store, routes & main DOM element
// ========================================================
const store = configureStore();
const routes = createRoutes();
const appDOM = document.getElementById('root');

// ========================================================
// Render Main App File
// ========================================================
function render(store, appDOM) {
  setWindowTitle();
  ReactDOM.render(<App store={store} routes={routes}/>, appDOM);
}

render(store, appDOM);

// ========================================================
// Configure service worker
// ========================================================
const config = {
  onUpdate: () => newVersionAvailable(store.dispatch),
  onReady: () => swReady(store.dispatch),
};

serviceWorker.register(config);
