import React, {memo, Suspense, lazy} from 'react';
import PropTypes from 'prop-types';

import {Container} from 'components/Container';
import Loading from 'components/Loading';
// import {getInitData} from '../actions/init';

const Dashboard = lazy(() => import('./Dashboard'));

const PageWithLayout = ({children}) => {
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
};

PageWithLayout.displayName = 'PageWithLayout';

export default memo(PageWithLayout);
