import React, {memo} from 'react';
import classNames from 'classnames';

export const Container = memo(function Container(props) {
  const classes = classNames(
    {
      container: props.fixed,
      'container-fluid': props.fluid,
    },
    props.className
  );
  const _props = {
    ...props,
    className: classes,
  };
  return <div {..._props}>{props.children}</div>;
});
