import React, {useState, useRef, lazy, Fragment, Suspense} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button,
  Toolbar,
  Input,
  LinearProgress,
  IconButton,
} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import SearchIcon from '@material-ui/icons/Search';
import HistoryIcon from '@material-ui/icons/History';
import {useStyles} from './TopBar.styles';
import Logo from 'assets/logo.png';
import RecentTabsBar from 'components/RecentTabsBar';

const Tabs = lazy(() => import('components/Tabs'));

const TopBar = ({className, logout, publicRoute, ...rest}) => {
  const classes = useStyles();
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [openTabsBar, setOpenTabsBar] = useState(false);

  /**
   * Handle of press logout button
   */
  const handleLogout = () => {
    logout();
  };

  /**
   * Handle click for open history tabs
   * @private
   */
  const _handleTabsBarOpen = () => {
    setOpenTabsBar(true);
  };

  /**
   * Handle click for close history tabs
   * @private
   */
  const handleTabsBarClose = () => {
    setOpenTabsBar(false);
  };

  /**
   * Handle changle of search box
   */
  const handleSearchChange = ({target: {value}}) => {
    setSearchValue(value);
  };

  /**
   * Handle for press Enter button in search box
   * @param {Object} ev
   * @private
   */
  const _handlePressEnterSearch = ev => {
    if (ev.key === 'Enter') {
      // searchClients({dni: searchValue})
    }
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
        onKeyPress={_handlePressEnterSearch}
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
      <IconButton
        className={classes.tabsButton}
        color="inherit"
        onClick={_handleTabsBarOpen}
      >
        <HistoryIcon/>
      </IconButton>
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
      <RecentTabsBar
        onClose={handleTabsBarClose}
        open={openTabsBar}
      />
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  logout: PropTypes.func,
  publicRoute: PropTypes.bool,
};

export default TopBar;
