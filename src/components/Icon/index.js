import React, {memo} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Icon = memo(function Icon(props) {
  const classesObj = {
    'rubix-icon': true,
    'form-control-feedback': props.feedback || false,
  };
  if (props.bundle) {
    classesObj[props.bundle] = true;
    classesObj[`icon-${props.bundle}-${props.glyph}`] = true;
  } else {
    classesObj[props.glyph] = true;
  }

  const classes = classNames(classesObj, props.className);

  const _props = {
    ...props,
    className: classes.trim(),
  };

  return <span className={_props.className} style={_props.style} />;
});

Icon.propTypes = {
  className: PropTypes.string,
  feedback: PropTypes.bool,
  bundle: PropTypes.string,
  glyph: PropTypes.string.isRequired,
};

export default Icon;
