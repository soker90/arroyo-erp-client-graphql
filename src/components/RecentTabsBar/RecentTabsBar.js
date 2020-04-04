import React, {memo} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from '@material-ui/core';
import {useStyles} from './RecentTabsBar.styles';

const RecentTabsBar = (
  {
    open,
    onClose,
    className,
    historytabs,
  }) => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="right"
      classes={{paper: classes.drawer}}
      elevation={1}
      onClose={onClose}
      open={open}
      variant="temporary"
    >
      <div
        className={clsx(classes.root, className)}
      >
        <List
          className={classes.list}
          subheader={(
            <ListSubheader
              disableGutters
              disableSticky
            >
              Pestañas recientes
            </ListSubheader>
          )}
        >
          {historytabs
            .map(tab => (
              <ListItem
                disableGutters
                key={tab.id}
                className={classes.listItem}
              >
                <ListItemText
                  className={classes.listItemText}
                  disableTypography
                  primary={(
                    <Typography
                      component={RouterLink}
                      display="block"
                      noWrap
                      to={tab.link}
                      variant="h6"
                    >
                      {tab.title}
                    </Typography>
                  )}
                />
              </ListItem>
            ))}
        </List>
      </div>
    </Drawer>
  );
};

RecentTabsBar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

RecentTabsBar.displayName = 'RecentTabsBar';

export default memo(RecentTabsBar);
