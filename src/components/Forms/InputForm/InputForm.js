import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Grid, TextField} from '@material-ui/core';

const InputForm = memo(({size = 6, ...rest}) =>
  <Grid
    item
    md={size}
    xs={12}
  >
    <TextField
      fullWidth
      {...rest}
    />
  </Grid>,
);

InputForm.propTypes = {
  size: PropTypes.number,
  label: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

InputForm.displayName = 'InputForm';

export default InputForm;