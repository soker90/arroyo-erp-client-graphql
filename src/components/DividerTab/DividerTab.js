import React, {memo} from 'react';
import {useStyles} from './DividerTab.styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';

const DividerTab = ({className}) => {
  const classes = useStyles();
  return <Divider className={clsx(classes.root, className)}/>
};

DividerTab.propTypes = {
  className: PropTypes.string,
};

DividerTab.displayName = 'DividerTab';

export default memo(DividerTab);
