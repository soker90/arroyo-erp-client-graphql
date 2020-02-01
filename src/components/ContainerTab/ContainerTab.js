import React, {memo} from 'react';
import {useStyles} from './ContainerTab.styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const ContainerTab = ({children, className}) => {
  const classes = useStyles();
  return <div className={clsx(classes.root, className)}>
    {children}
  </div>;
};

ContainerTab.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

ContainerTab.displayName = 'ContainerTab';

export default memo(ContainerTab);
