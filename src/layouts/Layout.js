import React, {memo, Suspense, useEffect, lazy} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from 'actions/auth';

import {Container} from 'components/Container';
import Loading from 'components/Loading';
import Dashboard from './Dashboard';
import {getInitData} from '../actions/init';

// const SidebarOld = lazy(() => import('components/SidebarOld'));

const PageWithLayout = ({isAuthenticated, logout, children, getInitData}) => {
  useEffect(() => {
    _checkAuth();
    //eslint-disable-next-line
  }, []);

  const _checkAuth = () => {
    if (!isAuthenticated) {
      logout();
      return;
    } else {
      getInitData();
    }
  };

  return (
    <Container id="container" className="container-open">
      <Suspense fallback={<Loading/>}>
        <Dashboard>
          {children}
        </Dashboard>
      </Suspense>
    </Container>
  );
};

PageWithLayout.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

PageWithLayout.displayName = 'PageWithLayout';

const mapStateToProps = ({auth}) => ({
  isAuthenticated: auth.isAuthenticated,
});

const mapDispatchToProps = {
  logout,
  getInitData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(PageWithLayout));
