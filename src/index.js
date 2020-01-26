import React from 'react';
import ReactDOM from 'react-dom';
import disableScroll from 'disable-scroll';

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

const {APP_VERSION, NERA_ENV_NAME} = process.env;

// ========================================================
// Prevent scroll
// ========================================================
disableScroll.on();

// ========================================================
// Remove loading app after 1/2 sec
// ========================================================
function removeLoading() {
  const elem = document.getElementById('app-loading');
  elem.className = 'app-loading hide-loading';

  setTimeout(() => {
    elem.parentNode.removeChild(elem);
    disableScroll.off();
  }, 500);
}

// ========================================================
// Auto Update window title (navigator)
// ========================================================
function setWindowTitle() {
  const title = ['NERA', APP_VERSION];
  if (NERA_ENV_NAME) {
    title.unshift(`[${NERA_ENV_NAME}]`);
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
  setTimeout(removeLoading, 1000);
  ReactDOM.render(<App store={store} routes={routes} />, appDOM);
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
