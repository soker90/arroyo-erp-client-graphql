import React, {memo} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Typography} from '@material-ui/core';

import {useStyles} from './Navigation.style';
import useRouter from 'utils/useRouter';
import NavigationList from './components/NavigationList';


const Navigation = memo(({title, pages, className, component: Component, permissions,...rest} ) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Component
      {...rest}
      className={clsx(classes.root, className)}
    >
      {title && <Typography variant="overline">{title}</Typography>}
      <NavigationList
        depth={0}
        pages={pages}
        router={router}
        permissions={permissions}
      />
    </Component>
  );
});

Navigation.propTypes = {
  className: PropTypes.string,
  component: PropTypes.any,
  pages: PropTypes.array.isRequired,
  title: PropTypes.string,
};

Navigation.defaultProps = {
  component: 'nav',
};

export default Navigation;
