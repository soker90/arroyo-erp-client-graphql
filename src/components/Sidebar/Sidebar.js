import React, {Fragment} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Divider, Paper, Avatar, Typography} from '@material-ui/core';

import {Navigation} from 'components';
import navigationConfig from './navigationConfig';
import {useStyles} from './Sidebar.styles';
import AvatarImg from 'assets/avatar.png';


const Sidebar = props => {
  const {className, name, lastname, email, logout, roles, permissions, ...rest} = props;

  const classes = useStyles();

  const navbarContent = (
    <div className={classes.content}>
      <div className={classes.profile}>
        <Avatar
          alt="Person"
          className={classes.avatar}
          component={RouterLink}
          src={AvatarImg}
          to="/profile/1/timeline"
        >{`${name?.[0]} ${lastname?.[0]}`}</Avatar>
        <Typography
          className={classes.name}
          variant="h4"
        >
          {name} {lastname}
        </Typography>
        <Typography variant="body2">{email}</Typography>
        <Typography variant="body2">{roles[0].description}</Typography>
      </div>
      <Divider className={classes.divider}/>
      <nav className={classes.navigation}>
        {navigationConfig.map((list, idx) => (
          <Navigation
            component="div"
            key={idx}
            pages={list.pages}
            title={list.title}
            permissions={permissions}
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
