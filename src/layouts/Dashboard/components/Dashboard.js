import React, {Suspense, memo} from 'react';
import PropTypes from 'prop-types';
import {LinearProgress} from '@material-ui/core';
import {Sidebar, TopBar} from 'components';
import {useStyles} from './Dashboard.styles';


const Dashboard = memo(({children}) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar
        className={classes.topBar}
      />
      <div className={classes.container}>
        <Sidebar
          className={classes.navBar}
        />
        <main className={classes.content}>
          <Suspense fallback={<LinearProgress/>}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
});

Dashboard.propTypes = {
  children: PropTypes.any,
};

export default Dashboard;
