import React, {Fragment} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Paper} from '@material-ui/core';

import {Navigation} from 'components';
import {getConfigSidebar} from './navigationConfig';
import {useStyles} from './Sidebar.styles';


const Sidebar = props => {
  const {className, name, lastname, email, logout, providers, ...rest} = props;

  const classes = useStyles();

  // TODO llamar aquí al servicio que trae los nombres y los ids de los proveedores

  const navbarContent = (
    <div className={classes.content}>
      <nav className={classes.navigation}>
        {getConfigSidebar(providers).map((list, idx) => (
          <Navigation
            component="div"
            key={idx}
            pages={list.pages}
            title={list.title}
          />
        ))}
      </nav>
    </div>
  );

  return (
    <Fragment>
      <Paper
        {...rest}
        className={clsx(classes.root, className)}
        elevation={1}
        square
      >
        {navbarContent}
      </Paper>
    </Fragment>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default Sidebar;
