import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@material-ui/core';

const HeaderGeneric = memo(({className, title, category}) =>
  <div
    className={className}
  >
    <Typography
      component="h2"
      gutterBottom
      variant="overline"
    >
      {category}
    </Typography>
    <Typography
      component="h1"
      variant="h3"
    >
      {title}
    </Typography>
  </div>,
);

HeaderGeneric.propTypes = {
  className: PropTypes.string,
  category: PropTypes.string,
  title: PropTypes.string.isRequired,
};

HeaderGeneric.displayName = 'HeaderGeneric';

export default HeaderGeneric;
