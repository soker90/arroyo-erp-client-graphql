import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Grid, TextField} from '@material-ui/core';

const SelectForm = memo(({size = 6, children, ...rest}) =>
  <Grid
    item
    md={size}
    xs={12}
  >
    <TextField
      fullWidth
      select
      SelectProps={{native: true}}
      {...rest}
    >
      {children}
    </TextField>
  </Grid>,
);

SelectForm.propTypes = {
  size: PropTypes.number,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  variant: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.object.isRequired,
};

SelectForm.displayName = 'SelectForm';

export default SelectForm;