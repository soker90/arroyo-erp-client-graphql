import React, {memo} from 'react';

export const Container = memo(function Container(props) {
  const _props = {
    ...props,
    className: props.className,
  };
  return <div {..._props}>{props.children}</div>;
});
