import React, {memo, Suspense, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from 'actions/auth';

import {Container} from 'components/Container';
import Loading from 'components/Loading';
import Dashboard from './Dashboard';

// const SidebarOld = lazy(() => import('components/SidebarOld'));

const PageWithLayout = memo(({isAuthenticated, logout, children}) => {
  useEffect(() => {
    _checkAuth();
    //eslint-disable-next-line
  }, []);

  const _checkAuth = () => {
    if (!isAuthenticated) {
      logout();
      return;
    }
  };

  return (
    <Container id="container" className="container-open">
      <Suspense fallback={<Loading/>}>
        {/*<SidebarOld/>*/}
        <Dashboard>
          {children}
        </Dashboard>
      </Suspense>
    </Container>
  );
});

PageWithLayout.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = ({auth}) => ({
  isAuthenticated: auth.isAuthenticated,
});

const mapDispatchToProps = {logout};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageWithLayout);
