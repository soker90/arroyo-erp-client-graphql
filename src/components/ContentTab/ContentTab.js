import React, {memo} from 'react';
import {useStyles} from './ContentTab.styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const ContentTab = ({children, className}) => {
  const classes = useStyles();
  return <div className={clsx(classes.root, className)}>
    {children}
  </div>;
};

ContentTab.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

ContentTab.displayName = 'ContentTab';

export default memo(ContentTab);
