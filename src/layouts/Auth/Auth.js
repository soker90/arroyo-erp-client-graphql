import React, {Fragment, Suspense} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {LinearProgress} from '@material-ui/core';

import {TopBar} from 'components';

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
  },
}));

const Auth = ({children}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <TopBar publicRoute />
      <main className={classes.content}>
        <Suspense fallback={<LinearProgress />}>
          {children}
        </Suspense>
      </main>
    </Fragment>
  );
};

Auth.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Auth;
