import React, {useState, useRef, lazy, Fragment, Suspense} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button,
  Toolbar,
  Input,
} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import SearchIcon from '@material-ui/icons/Search';
// import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import {useStyles} from './TopBar.styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Logo from 'assets/logo.png';
// import Badge from '@material-ui/core/Badge';
// import NotificationsPopover from '../NotificationsPopover';
const Tabs = lazy(() => import('components/Tabs'));

const TopBar = ({className, logout, publicRoute, ...rest}) => {
  const classes = useStyles();
  const searchRef = useRef(null);
  // const notificationsRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  // const [notifications, setNotifications] = useState([]);
  // const [openNotifications, setOpenNotifications] = useState(false);

  /**
   * Handle of press logout button
   */
  const handleLogout = () => {
    logout();
  };

  /* const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  }; */

  /**
   * Handle changle of search box
   */
  const handleSearchChange = event => {
    setSearchValue(event.target.value);
  };

  /**
   * Render the search box
   */
  const renderSearchBox = () =>
    <div
      className={classes.search}
      ref={searchRef}
    >
      <SearchIcon className={classes.searchIcon}/>
      <Input
        className={classes.searchInput}
        disableUnderline
        onChange={handleSearchChange}
        placeholder="Buscar por DNI"
        value={searchValue}
      />
    </div>;

  /**
   * Render logout buttonroot
   */
  const renderLogout = () =>
    <Fragment>
      <Button
        className={classes.logoutButton}
        color="inherit"
        onClick={handleLogout}
      >
        <InputIcon className={classes.logoutIcon}/>
        Salir
      </Button>
    </Fragment>;

  /**
   * Render components for private sections
   */
  const renderTopBarPrivate = () =>
    !publicRoute &&
    <Suspense fallback={<LinearProgress/>}>
      <Tabs/>
      <div className={classes.flexGrow}/>
      {renderSearchBox()}
      {/*<IconButton
            className={classes.notificationsButton}
            color="inherit"
            onClick={handleNotificationsOpen}
            ref={notificationsRef}
          >
            <Badge
              badgeContent={notifications.length}
              classes={{badge: classes.notificationsBadge}}
              variant="dot"
            >
              <NotificationsIcon/>
            </Badge>
          </IconButton>*/}
      {renderLogout()}
    </Suspense>;

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            src={Logo}
            height='45rem'
            width='100rem'
          />
        </RouterLink>
        {renderTopBarPrivate()}
      </Toolbar>
      {/*<NotificationsPopover
        anchorEl={notificationsRef.current}
        notifications={notifications}
        onClose={handleNotificationsClose}
        open={openNotifications}
      />*/}
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  logout: PropTypes.func,
  publicRoute: PropTypes.bool,
};

export default TopBar;
