import React from 'react';
import classNames from 'classnames';

export function PanelContainer(props) {
  const controls = null;
  const borderedClass = props.bordered ? ' bordered' : '';
  const _props = {
    ...props,
    className: classNames(
      'rubix-panel-container-with-controls',
      props.className
    ).trim(),
  };
  return (
    <div {..._props}>
      {controls}
      <div
        className={classNames('rubix-panel-container', borderedClass).trim()}
      >
        {props.children}
      </div>
    </div>
  );
}
