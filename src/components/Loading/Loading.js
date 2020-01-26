import React, {memo} from 'react';

import logo from 'assets/logo.png';

export default memo(() =>
  <div id="app-loading" className="app-loading hide-loading">
    <section className="loaders">
      <span className="loader loader-circles"/>
      <img className="loading-logo" src={logo} alt="logo"/>
    </section>
  </div>
);
